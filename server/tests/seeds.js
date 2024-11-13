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
  data.users.forEach(async (user) => {
    if (user.password) {
      await prisma.createUser(
        user.username,
        user.email,
        bcrypt.hashSync(user.password, 10)
      );
    } else {
      await prisma.findOrCreateUser(user.username, user.email);
    }
  });
};

const emptyDb = async () => {
  await prisma.deleteUsers();
};

module.exports = { data, populateDb, emptyDb };
