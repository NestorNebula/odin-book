const { request, app, data } = require('../../../tests/setup');
const router = require('../../../routes/user');

beforeAll(() => {
  app.use('/', router);
});

describe('deleteFollowing', () => {
  it("returns 403 when trying to delete someone else's follow", async () => {
    return request(app)
      .delete(`/${data.users[0].id + 1}/following`)
      .send({ userId: data.users[0].id + 2 })
      .type('form')
      .expect(403);
  });

  it('returns user with following after successful unfollow', async () => {
    return request(app)
      .post(`/${data.users[0].id}/following`)
      .send({ userId: data.users[0].id + 1 })
      .type('form')
      .then((res) => {
        expect(res.body.user.following.length).toBe(1);
        return request(app)
          .delete(`/${data.users[0].id}/following`)
          .send({ userId: data.users[0].id + 1 })
          .type('form')
          .then((res) => {
            expect(res.body.user.following.length).toBe(0);
          });
      });
  });
});
