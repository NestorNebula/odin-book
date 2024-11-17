const { request, app, data } = require('../../../tests/setup');
const router = require('../../../routes/user');

beforeAll(() => {
  app.use('/', router);
});

describe('getAllPosts', () => {
  it("returns user's posts and reposts", async () => {
    const user = data.users[0];
    return request(app)
      .get(`/${user.id}/posts`)
      .then((res) => {
        expect(res.body.posts.length).toBe(user.posts.length);
        expect(res.body.reposts.length).toBe(
          user.interactions.filter((i) => i.type === 'REPOST').length
        );
      });
  });
});
