const { request, app, data } = require('../../../tests/setup');
const router = require('../../../routes/user');
const { getReqUser } = require('../../../tests/reqUser');

beforeAll(() => {
  app.use('/', router);
});

describe('postFollowing', () => {
  it('returns user with following after successful follow', async () => {
    const user = await getReqUser(data);
    return request(app)
      .post(`/${user.id}/following`)
      .send({ userId: user.id + 1 })
      .type('form')
      .expect(200)
      .then((res) => {
        expect(res.body.user.following.length).toBe(1);
      });
  });

  it("returns 403 when trying to update someone else's follows", async () => {
    const user = await getReqUser(data);
    return request(app)
      .post(`/${user.id + 1}/following`)
      .send({ userId: user.id })
      .type('form')
      .expect(403);
  });

  it('returns 404 when trying to follow non-existent user', async () => {
    const user = await getReqUser(data);
    return request(app)
      .post(`/${user.id}/following`)
      .send({ userId: user.id - 1 })
      .type('form')
      .expect(404);
  });
});
