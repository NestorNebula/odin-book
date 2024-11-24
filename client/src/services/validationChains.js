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
};

export default validationChains;
