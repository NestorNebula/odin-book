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

const data = {
  users: [
    getFakeLocalUser(),
    getFakeLocalUser(),
    getFakeGitHubUser(),
    getFakeGitHubUser(),
    getFakeLocalUser(),
  ],
};

const populateDb = async (data) => {
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
  }
};

const emptyDb = async () => {
  await prisma.__deleteUsers();
};

module.exports = { data, populateDb, emptyDb };
