import { faker } from '@faker-js/faker';

const getFullFakeUser = ({
  loginMethod,
  numFollowing,
  numFollowers,
  numNotifications,
}) => {
  const id = faker.number.int();
  const name = faker.person.firstName().toLowerCase();
  const following = [];
  for (let i = 0; i < numFollowing; i++) {
    following.push(getFakeUser());
  }
  const followers = [];
  for (let i = 0; i < numFollowers; i++) {
    followers.push(getFakeUser());
  }
  const notifications = [];
  for (let i = 0; i < numNotifications; i++) {
    notifications.push(getFakeNotification({ userId: id }));
  }
  return {
    id,
    username: name,
    email: faker.internet.email({ firstName: name }).toLowerCase(),
    loginMethod: loginMethod ?? 'PASSWORD',
    profile: getFakeProfile({ id, username: name }),
    following,
    followers,
  };
};

const getFakeUser = ({ userId }) => {
  const id = userId ?? faker.number.int();
  const name = faker.person.firstName().toLowerCase();
  return {
    id,
    username: name,
    profile: getFakeProfile({ id, username: name }),
  };
};

const getFakeProfile = ({ id, username }) => {
  return {
    displayName: username ?? faker.person.firstName().toLowerCase(),
    avatar: faker.internet.url(),
    background: faker.internet.url(),
    bio: faker.lorem.paragraph(),
    website: faker.internet.url(),
    location: faker.location.city(),
    creationDate: faker.date.recent(),
    userId: id ?? faker.number.int(),
  };
};

const getFakePost = ({
  details,
  numComments,
  type,
  numInteractions,
  commentedPostId,
  authorId,
}) => {
  const postType = type ?? 'POST';
  const id = faker.number.int();
  const userId = authorId ?? faker.number.int();
  const comments = [];
  for (let i = 0; i < numComments; i++) {
    comments.push(
      getFakePost({ details: true, type: 'COMMENT', commentedPostId: id })
    );
  }
  const interactions = [];
  for (let i = 0; i < numInteractions; i++) {
    interactions.push(
      getFakeInteraction({ details: false, postId: id, authorId: userId })
    );
  }
  return {
    id,
    content: faker.lorem.paragraph(),
    file: faker.internet.url(),
    creationDate: faker.date.recent(),
    type: postType,
    comments: details ? comments : null,
    commentedPostId: details && type === 'COMMENT' ? commentedPostId : null,
    userId,
    user: getFakeUser({ userId }),
    interactions,
  };
};

const getFakeInteraction = ({ details, type, postId, authorId, userId }) => {
  const types = ['LIKE', 'REPOST', 'BOOKMARK'];
  const interactionType = type ?? types[Math.random() * types.length];
  const interactionPostId = details ? postId ?? faker.number.int() : null;
  const interactionUserId = userId ?? faker.number.int();
  return {
    creationDate: details ? faker.date.recent() : null,
    type: interactionType,
    userId: interactionUserId,
    user: details ? getFakeUser({ userId }) : null,
    postId: interactionPostId,
    post: details
      ? getFakePost({ details: true, authorId: authorId ?? faker.number.int() })
      : null,
  };
};

const getFakeChat = ({ numMessages, userId }) => {
  const users = [
    getFakeUser({ userId: userId ?? faker.number.int() }),
    getFakeUser(),
  ];
  const id = faker.number.int();
  const messages = [];
  for (let i = 0; i < numMessages; i++) {
    messages.push(
      getFakeMessage({
        chatId: id,
        authorId: Number.isFinite(i / 2) ? users[0] : users[1],
      })
    );
  }
  return {
    id,
    creationDate: faker.date.recent(),
    updatedAt: faker.date.recent(),
    users,
    messages,
  };
};

const getFakeMessage = ({ chatId, authorId }) => {
  const userId = authorId ?? faker.number.int();
  return {
    id: faker.number.int(),
    content: faker.lorem.paragraph(),
    file: faker.internet.url(),
    creationDate: faker.date.recent(),
    userId,
    user: getFakeUser({ userId }),
    chatId: chatId ?? faker.number.int(),
  };
};

const getFakeNotification = ({ userId, type, seen }) => {
  const types = ['FOLLOW', 'COMMENT', 'LIKE', 'REPOST'];
  const notificationType = type ?? types[Math.random() * types.length];
  const notifierUserId = faker.number.int();
  const postId = notificationType !== 'FOLLOW' ? faker.number.int() : null;
  return {
    id: faker.number.int(),
    notificationType,
    seen: seen ?? false,
    creationDate: faker.date.recent(),
    notifiedUserId: userId,
    notifierUserId,
    notifierUser: getFakeUser({ userId: notifierUserId }),
    postId,
    post:
      notificationType !== 'FOLLOW'
        ? getFakePost({ details: false, authorId: userId })
        : null,
  };
};

const testsData = {
  fullUser: getFullFakeUser,
  user: getFakeUser,
  profile: getFakeProfile,
  post: getFakePost,
  interaction: getFakeInteraction,
  chat: getFakeChat,
  message: getFakeMessage,
  notification: getFakeNotification,
};

export default testsData;
