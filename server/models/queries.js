const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const databaseUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

// User

const findOrCreateUser = async (username, email) => {
  const user = await prisma.user.upsert({
    where: {
      email_loginMethod: {
        email,
        loginMethod: 'GITHUB',
      },
    },
    update: {},
    create: {
      username,
      email,
      loginMethod: 'GITHUB',
      profile: {
        create: {
          displayName: username,
        },
      },
    },
    select: { id: true },
  });
  return user;
};

const findUserByUsermail = async (usermail) => {
  const user = await prisma.user.findFirst({
    where: {
      loginMethod: 'PASSWORD',
      OR: [{ username: usermail }, { email: usermail }],
    },
    select: {
      id: true,
      password: true,
    },
  });
  return user;
};

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

const createUser = async (username, email, password) => {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
      profile: {
        create: {
          displayName: username,
        },
      },
    },
  });
  return user;
};

// Profile

// Post

// Interaction

// Message

// Chat

// Notification

module.exports = {
  findOrCreateUser,
  findUserByUsermail,
  findUserById,
  createUser,
};
