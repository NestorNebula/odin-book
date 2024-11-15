const { app, request, data } = require('../../tests/setup');
const router = require('../../routes/user');

beforeAll(() => {
  app.use('/', router);
});

describe('putUser', () => {
  it('returns 400 and error when submitting incorrect data', async () => {
    return request(app)
      .put(`/${data.users[0].id}`)
      .send({ username: 'new' })
      .type('form')
      .expect(400)
      .then((res) => {
        expect(res.body.errors[0].msg).toMatch(/characters/i);
      });
  });

  it('returns 400 and error when github user try to update his email', async () => {
    return request(app)
      .put(`/${data.users[0].id}`)
      .send({ email: 'mynew@email.com' })
      .type('form')
      .expect(400)
      .then((res) => {
        expect(res.body.errors[0].msg).toMatch(/github/i);
      });
  });

  it('returns 403 when trying to update another user', async () => {
    return request(app)
      .put(`/${data.users[0].id + 1}`)
      .send({ username: 'new' })
      .type('form')
      .expect(403);
  });

  it('returns user after successful update', async () => {
    return request(app)
      .put(`/${data.users[0].id}`)
      .send({ username: 'newusername' })
      .type('form')
      .then((res) => {
        expect(res.body.user.username).toBe('newusername');
      });
  });
});
