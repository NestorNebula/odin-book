const { request, app, data } = require('../../../tests/setup');
const router = require('../../../routes/user');
const { getReqUser } = require('../../../tests/reqUser');

beforeAll(() => {
  app.use('/', router);
});

describe('deleteFollowing', () => {
  it("returns 403 when trying to delete someone else's follow", async () => {
    const user = await getReqUser(data);
    return request(app)
      .delete(`/${user.id + 1}/following`)
      .send({ userId: user.id + 2 })
      .type('form')
      .expect(403);
  });

  it('returns user with following after successful unfollow', async () => {
    const user = await getReqUser(data);
    request(app)
      .post(`/${user.id}/following`)
      .send({ userId: user.id + 1 })
      .type('form');
    return request(app)
      .delete(`/${user.id}/following`)
      .send({ userId: user.id + 1 })
      .type('form')
      .then((res) => {
        expect(res.body.user.following.length).toBeNull();
      });
  });
});
