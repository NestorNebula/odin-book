const { request, app, data } = require('../../../tests/setup');
const router = require('../../../routes/user');

beforeAll(() => {
  app.use('/', router);
});

describe('postFollowing', () => {
  it('returns user with following after successful follow', async () => {
    return request(app)
      .post(`/${data.users[0].id}/following`)
      .send({ userId: data.users[0].id + 1 })
      .type('form')
      .expect(200)
      .then((res) => {
        expect(res.body.user.following.length).toBe(1);
      });
  });

  it("returns 403 when trying to update someone else's follows", async () => {
    return request(app)
      .post(`/${data.users[0].id + 1}/following`)
      .send({ userId: data.users[0].id })
      .type('form')
      .expect(403);
  });

  it('returns 404 when trying to follow non-existent user', async () => {
    return request(app)
      .post(`/${data.users[0].id}/following`)
      .send({ userId: data.users[0].id - 1 })
      .type('form')
      .expect(404);
  });
});
