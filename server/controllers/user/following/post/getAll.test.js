const { request, app, data } = require('../../../../tests/setup');
const router = require('../../../../routes/user');

beforeAll(() => {
  app.use('/', router);
});

describe('getAllFollowingPosts', () => {
  it('returns all following posts and reposts when user follows only one user', async () => {
    const user = data.users[0];
    return request(app)
      .post(`/${user.id}/following`)
      .send({ userId: user.id + 1 })
      .type('form')
      .then(() => {
        return request(app)
          .get(`/${user.id}/following/posts`)
          .then((res) => {
            expect(res.body.posts.length).toBe(
              data.posts.filter(
                (p) => p.userId >= user.id && p.userId < user.id + 2
              ).length
            );
            expect(res.body.reposts.length).toBe(
              data.interactions.filter(
                (i) =>
                  i.type === 'REPOST' &&
                  (i.userId === user.id || i.userId === user.id + 1)
              ).length
            );
          });
      });
  });

  it('returns all following posts when user follow multiple users', async () => {
    const user = data.users[0];
    return request(app)
      .post(`/${user.id}/following`)
      .send({ userId: user.id + 2 })
      .type('form')
      .then(() => {
        return request(app)
          .get(`/${user.id}/following/posts`)
          .then((res) => {
            expect(res.body.posts.length).toBe(
              data.posts.filter(
                (p) => p.userId >= user.id && p.userId <= user.id + 2
              ).length
            );
          });
      });
  });
});
