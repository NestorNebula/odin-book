const { request, app, data } = require('../../../../tests/setup');
const router = require('../../../../routes/user');
const { getReqUser } = require('../../../../tests/reqUser');

beforeAll(() => {
  app.use('/', router);
});

describe('getAllFollowingPosts', () => {
  it('returns all following posts when user follows only one user', async () => {
    const user = await getReqUser(data);
    return request(app)
      .post(`/${user.id}/following`)
      .send({ userId: user.id + 1 })
      .type('form')
      .then(() => {
        return request(app)
          .get(`/${user.id}/following/posts`)
          .then((res) => {
            expect(res.body.posts.length).toBe(
              data.posts.filter((p) => p.id >= user.id && p.id < user.id + 2)
                .length
            );
          });
      });
  });

  it('returns all following posts when user follow multiple users', async () => {
    const user = await getReqUser(data);
    return request(app)
      .post(`/${user.id}/following`)
      .send({ userId: user.id + 2 })
      .type('form')
      .then(() => {
        return request(app)
          .get(`/${user.id}/following/posts`)
          .then((res) => {
            expect(res.body.posts.length).toBe(
              data.posts.filter((p) => p.id >= user.id && p.id <= user.id + 2)
                .length
            );
          });
      });
  });
});
