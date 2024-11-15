const { faker } = require('@faker-js/faker');
const prisma = require('../models/queries');
const bcrypt = require('bcrypt');

const getFakeUser = () => {
  const username = faker.person.firstName().toLowerCase();
  return {
    username,
    email: faker.internet.email({ firstName: username }).toLowerCase(),
  };
};

const getFakeLocalUser = () => {
  const user = getFakeUser();
  user.password = faker.internet.password({ length: 20, memorable: true });
  return user;
};

const getFakeGitHubUser = () => {
  const user = getFakeUser();
  user.password = null;
  return user;
};

const getFakePost = (user) => {
  return {
    content: faker.lorem.paragraph(),
    file: null,
    userId: user.id,
  };
};

const data = {
  users: [
    getFakeGitHubUser(),
    getFakeLocalUser(),
    getFakeGitHubUser(),
    getFakeGitHubUser(),
    getFakeLocalUser(),
  ],
  posts: [],
};

const populateDb = async (data) => {
  await populateUsers(data);
  await populatePosts(data);
};

const populateUsers = async (data) => {
  for (let i = 0; i < data.users.length; i++) {
    const users = await prisma.findUsers();
    if (users.length !== i) {
      throw new Error('Error when populating db.');
    }
    const user = data.users[i];
    if (user.password) {
      await prisma.createUser(user.username, user.email, user.password);
    } else {
      await prisma.findOrCreateUser(user.username, user.email);
    }
    data.users[i] = await prisma.__findFullUserByUsername(
      data.users[i].username
    );
    if (!data.users[i]) throw new Error('Error when populating db.');
  }
};

const populatePosts = async (data) => {
  for (let i = 0; i < data.users.length; i++) {
    const user = await prisma.__findFullUserByUsername(data.users[i].username);
    if (!user) throw new Error('Error when populating db.');
    const post = getFakePost(user.id);
    const postedPost = await prisma.createPost(
      user.id,
      post.content,
      post.file
    );
    if (!postedPost) throw new Error('Error when populating db.');
    data.posts.push(postedPost);
  }
};

const emptyDb = async () => {
  await prisma.__deleteUsers();
};

module.exports = { data, populateDb, emptyDb };
