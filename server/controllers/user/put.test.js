const { app, request, data } = require('../../tests/setup');
const router = require('../../routes/user');
const { getReqUser } = require('../../tests/reqUser');

beforeAll(() => {
  app.use('/', router);
});

describe('putUser', () => {
  it('returns user after successful update', async () => {
    return request(app)
      .put(`/${await getReqUser(data)}`)
      .send({ username: 'newusername' })
      .type('form')
      .then((res) => {
        expect(res.body.user.username).toBe('newusername');
      });
  });

  it('returns 400 and error when submitting incorrect data', async () => {
    return request(app)
      .put(`/${await getReqUser(data)}`)
      .send({ username: 'new' })
      .type('form')
      .expect(400)
      .then((res) => {
        expect(res.body.errors[0].msg).toMatch(/characters/i);
      });
  });

  it('returns 400 and error when github user try to update his email', async () => {
    return request(app)
      .put(`/${await getReqUser(data)}`)
      .send({ email: 'mynew@email.com' })
      .type('form')
      .expect(400)
      .then((res) => {
        expect(res.body.errors[0].msg).toMatch(/github/i);
      });
  });

  it('returns 403 when trying to update another user', async () => {
    return request(app)
      .put(`/${(await getReqUser(data)) + 1}`)
      .send({ username: 'new' })
      .type('form')
      .expect(403);
  });
});
