import inputValidation from './inputValidation.js';
const validationChains = {
  username: {
    before: (username) => {
      return inputValidation(username, 'Username')
        .setLowerCase()
        .maxLength(15)
        .result();
    },
    after: (username) => {
      return inputValidation(username, 'Username')
        .minLength(4)
        .format(new RegExp('^[a-z0-9-_.]*$'), 'great.user_name')
        .result();
    },
  },

  email: {
    before: (email) => {
      return inputValidation(email, 'Email')
        .setLowerCase()
        .maxLength(255)
        .result();
    },
    after: (email) => {
      return inputValidation(email, 'Email')
        .minLength(1, true)
        .format(
          new RegExp('^[\\w-.]+@[\\w-]+\\.[\\w-]{2,4}$'),
          'this@email.com'
        )
        .result();
    },
  },

  usermail: {
    before: (usermail) => {
      return inputValidation(usermail, 'Username/Email')
        .setLowerCase()
        .maxLength(255)
        .result();
    },
    after: (usermail) => {
      return inputValidation(usermail, 'Username/Email').minLength(1).result();
    },
  },

  currentPassword: {
    before: (password) => {
      return inputValidation(password, 'Current Password').result();
    },
    after: (password) => {
      return inputValidation(password, 'Current Password')
        .minLength(1, false, 'Please enter your current password.')
        .result();
    },
  },

  password: {
    before: (password) => {
      return inputValidation(password, 'Password').result();
    },
    after: (password) => {
      return inputValidation(password, 'Password').minLength(8).result();
    },
  },

  confirmPassword: {
    before: (password) => {
      return inputValidation(password, 'Password').result();
    },
    after: (password) => {
      return inputValidation(password, 'Password')
        .minLength(8, false, 'Please confirm your password. ')
        .result();
    },
  },

  postContent: {
    before: (content) => {
      return inputValidation(content, 'Content').maxLength(280).result();
    },
    after: (content) => {
      return inputValidation(content, 'Content').result();
    },
  },

  displayName: {
    before: (name) => {
      return inputValidation(name, 'Name').maxLength(50).result();
    },
    after: (name) => {
      return inputValidation(name, 'Name').minLength(1).result();
    },
  },

  bio: {
    before: (bio) => {
      return inputValidation(bio, 'Bio').maxLength(160).result();
    },
    after: (bio) => {
      return inputValidation(bio, 'Bio').result();
    },
  },

  location: {
    before: (location) => {
      return inputValidation(location, 'Location').maxLength(30).result();
    },
    after: (location) => {
      return inputValidation(location, 'Location').result();
    },
  },

  website: {
    before: (website) => {
      return inputValidation(website, 'Website').maxLength(100).result();
    },
    after: (website) => {
      return inputValidation(website, 'Website')
        .format(
          new RegExp(
            '^https:\\/\\/[\\w\\.\\/-]+\\.[a-z]{2,4}[\\w\\.\\/-?=#]*$'
          ),
          'https://github.com/NestorNebula',
          true
        )
        .result();
    },
  },
};

export default validationChains;
