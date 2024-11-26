const defaultContext = {
  id: 0,
  username: 'guest',
  email: null,
  loginMethod: 'GUEST',
  profile: {
    userId: 0,
    displayName: 'Guest',
    avatar: null,
    background: null,
    bio: null,
    location: null,
    website: null,
    creationDate: new Date(Date.now()),
  },
  following: [],
  followers: [],
  notifications: [],
};

export default defaultContext;
