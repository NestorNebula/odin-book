const { faker } = require('@faker-js/faker');
const prisma = require('../models/queries');

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
  follows: [],
  interactions: [],
  chats: [],
  messages: [],
  notifications: [],
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
    const user = data.users[i];
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

const populateFollows = async (data) => {
  for (let i = 0; i < data.users.length; i++) {
    const user = data.users[i];
    if (i > 0) {
      await prisma.connectUserFollowing(user.id, user.id - 1);
      data.follows.push({ followed: data.users[i - 1], following: user });
    }
    if (i < data.users.length - 1) {
      await prisma.connectUserFollowing(user.id, user.id + 1);
      data.follows.push({ followed: data.users[i + 1], following: user });
    }
  }
};

const populateInteractions = async (data) => {
  for (let i = 0; i < data.users.length; i++) {
    for (let j = 0; j < data.posts.length; j++) {
      const user = data.users[i];
      const post = data.posts[j];
      if (Number.isInteger(j / 3)) {
        const interaction = await prisma.createInteraction(
          user.id,
          post.id,
          'BOOKMARK'
        );
        data.interactions.push(interaction);
      }
      if (Number.isInteger(j / 2)) {
        const interaction = await prisma.createInteraction(
          user.id,
          post.id,
          'REPOST'
        );
        data.interactions.push(interaction);
      }
      const interaction = await prisma.createInteraction(
        user.id,
        post.id,
        'LIKE'
      );
      data.interactions.push(interaction);
    }
  }
};

const populateChats = async (data) => {
  for (let i = 0; i < data.users.length; i++) {
    if (i < data.users.length - 1) {
      const chat = await prisma.createChat(
        data.users[i].id,
        data.users[i + 1].id
      );
      data.chats.push(chat);
    } else {
      const chat = await prisma.createChat(data.users[i].id, data.users[0].id);
      data.chats.push(chat);
    }
  }
};

const populateMessages = async (data) => {
  for (let i = 0; i < data.chats.length; i++) {
    const message = await prisma.createMessage(
      data.chats[i].users[0].id,
      data.chats[i].id
    );
    data.messages.push(message);
  }
};

const populateNotifications = async (data) => {
  for (let i = 0; i < data.follows.length; i++) {
    const notification = await prisma.createNotification(
      data.follows[i].following.id,
      data.follows[i].followed.id,
      'FOLLOW'
    );
    data.notifications.push(notification);
  }
  for (let i = 0; i < data.interactions.length; i++) {
    if (data.interactions[i].type !== 'BOOKMARK') {
      const post = data.posts.find((p) => p.id === data.interactions[i].postId);
      if (!post) throw new Error('Error when populating db.');
      const notification = await prisma.createNotification(
        data.interactions[i].userId,
        post.userId,
        data.interactions[i].type,
        post.id
      );
      data.notifications.push(notification);
    }
  }
};

const populateDb = async (data) => {
  await populateUsers(data);
  await populatePosts(data);
  await populateFollows(data);
  await populateInteractions(data);
  await populateChats(data);
  await populateMessages(data);
  await populateNotifications(data);
  data.users = await prisma.__findFullUsers();
};

const emptyDb = async () => {
  await prisma.__deleteUsers();
};

module.exports = { data, populateDb, emptyDb };
