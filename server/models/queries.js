const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const isUsingTestDb = process.env.NODE_ENV === 'test';
const databaseUrl = isUsingTestDb
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
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
  return user;
};

const findUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
    },
  });
  return user;
};

const __findFullUserByUsername = async (username) => {
  if (!isUsingTestDb) return;
  const user = await prisma.user.findUniqueOrThrow({
    where: { username },
    include: {
      profile: true,
      following: true,
      followers: true,
      posts: true,
      interactions: true,
      chats: true,
      messages: true,
      notifications: true,
      notificationsSent: true,
    },
  });
  return user;
};

const findUsers = async (username, limit = 100) => {
  const users = await prisma.user.findMany({
    select: { id: true, username: true, profile: true, followers: true },
    take: limit,
  });
  return users;
};

const findNonFollowedUsers = async (id, limit = 100) => {
  const users = await prisma.user.findMany({
    where: {
      followers: {
        every: { id: { not: id } },
      },
    },
    select: { id: true, username: true, profile: true, followers: true },
    take: limit,
  });
  return users;
};

const findUsersBySearch = async (search, limit = 100) => {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: search } },
        { profile: { displayName: { contains: search } } },
      ],
    },
  });
  return users;
};

const createUser = async (username, email, password) => {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
      loginMethod: 'PASSWORD',
      profile: {
        create: {
          displayName: username,
        },
      },
    },
    select: {
      id: true,
      username: true,
      email: true,
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

// Table resets (only for test db)

const __deleteUsers = async () => {
  if (!isUsingTestDb) return;
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});
};

module.exports = {
  findOrCreateUser,
  findUserByUsermail,
  findUserById,
  findUserByUsername,
  __findFullUserByUsername,
  findUsers,
  findNonFollowedUsers,
  findUsersBySearch,
  createUser,
  __deleteUsers,
};
