const { request, app, data } = require('../../tests/setup');
const router = require('../../routes/user');

beforeAll(() => {
  app.use('/', router);
});

describe('getUser', () => {
  it('returns existing user', async () => {
    return request(app)
      .get(`/${data.users[0].id}`)
      .then((res) => {
        expect(res.body.user.username).toBe(data.users[0].username);
      });
  });

  it('returns 404 when trying to get a non-existing user', (done) => {
    request(app)
      .get(`/${data.users[0].id - 1}`)
      .expect(404, done);
  });
});
