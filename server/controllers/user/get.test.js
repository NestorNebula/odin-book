const { request, app, data } = require('../../tests/setup');
const router = require('../../routes/user');
const prisma = require('../../models/queries');
const { setReqUser, getReqUser } = require('../../tests/reqUser');

beforeAll(() => {
  setReqUser(app, data);
  app.use('/', router);
});

describe('getUser', () => {
  it('returns existing user', async () => {
    const user = await getReqUser(data);
    return request(app)
      .get(`/${user.id}`)
      .then((res) => {
        expect(res.body.user.username).toBe(user.username);
      });
  });

  it('returns 404 when trying to get a non-existing user', async () => {
    const user = await getReqUser(data);
    return request(app)
      .get(`/${user.id - 1}`)
      .expect(404);
  });
});
