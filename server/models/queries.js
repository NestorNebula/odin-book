const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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
    },
    select: { id: true },
  });
  return user;
};

// Profile

// Post

// Interaction

// Message

// Chat

// Notification

module.exports = { findOrCreateUser };
