const { request, app, data } = require('../../tests/setup');
const router = require('../../routes/post');

beforeAll(() => app.use('/', router));

describe('getAllPosts', () => {
  it('returns all posts', async () => {
    return request(app)
      .get('/')
      .then((res) => {
        expect(res.body.posts.length).toBe(data.posts.length);
      });
  });

  it("doesn't return more posts than limit query", async () => {
    return request(app)
      .get('/')
      .query({ limit: 2 })
      .then((res) => {
        expect(res.body.posts.length).toBeLessThanOrEqual(2);
      });
  });

  it('returns posts matching the search query', async () => {
    const search = data.posts[0].content.split(' ')[0];
    const regExp = new RegExp(search, 'i');
    return request(app)
      .get('/')
      .query({ search })
      .then((res) => {
        expect(res.body.posts.length).toBe(
          data.posts.filter(
            (p) =>
              regExp.test(p.content) ||
              regExp.test(data.users.find((u) => u.id === p.userId).username)
          ).length
        );
      });
  });
});
