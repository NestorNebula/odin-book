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
      loginMethod: true,
      profile: true,
      following: true,
      followers: true,
      posts: true,
      interactions: true,
      notifications: true,
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

const findUsers = async (limit) => {
  const users = await prisma.user.findMany({
    select: { id: true, username: true, profile: true, followers: true },
    take: limit,
  });
  return users;
};

const __findFullUsers = async () => {
  if (!isUsingTestDb) return;
  const users = await prisma.user.findMany({
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
  return users;
};

const findNonFollowedUsers = async (id, limit) => {
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

const findUsersBySearch = async (search, limit) => {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: search } },
        { profile: { displayName: { contains: search } } },
      ],
    },
    take: limit,
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

const updateUser = async (id, username, email, password) => {
  const user = await prisma.user.update({
    where: { id },
    data: { username, email, password },
  });
  return user;
};

// Profile

const findProfile = async (userId) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });
  return profile;
};

const updateProfile = async (
  userId,
  displayName,
  avatar,
  background,
  bio,
  website,
  location
) => {
  const profile = await prisma.profile.update({
    where: { userId },
    data: {
      displayName,
      avatar,
      background,
      bio,
      website,
      location,
    },
  });
  return profile;
};

const connectUserFollowing = async (userId, userToFollowId) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      following: {
        connect: {
          id: userToFollowId,
        },
      },
    },
    select: {
      following: true,
    },
  });
  return user;
};

const disconnectUserFollowing = async (userId, userToUnfollowId) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      following: {
        disconnect: {
          id: userToUnfollowId,
        },
      },
    },
    select: {
      following: true,
    },
  });
  return user;
};

const findUserFollowingPosts = async (userId) => {
  const posts = await prisma.post.findMany({
    where: {
      OR: [{ userId }, { user: { followers: { some: { id: userId } } } }],
    },
    orderBy: {
      creationDate: 'desc',
    },
    include: {
      user: {
        select: { username: true, profile: true },
      },
      interactions: {
        select: { type: true, userId: true },
      },
      comments: true,
      commentedPost: {
        include: {
          user: { select: { username: true, id: true, profile: true } },
        },
      },
    },
  });
  return posts;
};

// Post

const createPost = async (userId, content, file) => {
  const post = await prisma.post.create({
    data: {
      user: { connect: { id: userId } },
      content,
      file,
      type: 'POST',
    },
  });
  return post;
};

const createPostComment = async (userId, postId, content, file) => {
  const postComment = await prisma.post.create({
    data: {
      user: { connect: { id: userId } },
      commentedPost: { connect: { id: postId } },
      content,
      file,
      type: 'COMMENT',
    },
  });
  return postComment;
};

// Interaction

const createInteraction = async (userId, postId, type) => {
  const interaction = await prisma.interaction.create({
    data: {
      user: {
        connect: { id: userId },
      },
      post: {
        connect: { id: postId },
      },
      type,
    },
  });
  return interaction;
};

// Message

// Chat

// Notification

// Table resets (only for test db)

const __deleteUsers = async () => {
  if (!isUsingTestDb) return;
  await prisma.post.deleteMany({});
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
  __findFullUsers,
  findNonFollowedUsers,
  findUsersBySearch,
  createUser,
  updateUser,
  findProfile,
  updateProfile,
  connectUserFollowing,
  disconnectUserFollowing,
  findUserFollowingPosts,
  createPost,
  createPostComment,
  createInteraction,
  __deleteUsers,
};
