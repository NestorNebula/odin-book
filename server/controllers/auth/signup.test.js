const { request, app, data } = require('../../tests/setup');
const router = require('../../routes/auth');

app.use('/', router);

describe('sign up', () => {
  it('returns user after successful signup', () => {
    return request(app)
      .post('/signup')
      .send({
        username: 'username',
        email: 'email@email.com',
        password: 'securepassword',
      })
      .type('form')
      .then((res) => {
        expect(res.body.user.username).toBe('username');
        expect(res.body.user.email).toBe('email@email.com');
      });
  });

  it('returns 400 and errors when trying to create an account with data already taken', () => {
    return request(app)
      .post('/signup')
      .send({
        username: data.users[0].username,
        email: data.users[1].email,
        password: 'securepassword',
      })
      .type('form')
      .expect(400)
      .then((res) => {
        expect(res.body.errors).not.toBeNull();
        expect(res.body.errors[0].msg).toMatch(/username already taken/i);
        expect(res.body.errors[1].msg).toMatch(/email already taken/i);
      });
  });

  it('returns 400 and errors when submitting incorrect data', () => {
    return request(app)
      .post('/signup')
      .send({
        username: 'averylongusername',
        email: 'incorrectemail',
        password: 'securepassword',
      })
      .type('form')
      .expect(400)
      .then((res) => {
        expect(res.body.errors).not.toBeNull();
        expect(res.body.errors[0].msg).toMatch(/15 characters/i);
        expect(res.body.errors[1].msg).toMatch(/valid email/i);
      });
  });
});
