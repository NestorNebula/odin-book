const { request, app, data } = require('../../../tests/setup');
const router = require('../../../routes/user');

beforeAll(() => app.use('/', router));

describe('deletePost', () => {
  it('returns deleted post', async () => {
    const user = data.users[0];
    return request(app)
      .delete(`/${user.id}/posts/${user.posts[0]}`)
      .then((res) => {
        expect(res.body.post.content).toBe(user.posts[0].content);
      });
  });

  it("returns 403 when trying to delete someone else's post", (done) => {
    request(app)
      .delete(`/${data.users[1].id}/posts/${data.users[1].posts[0]}`)
      .expect(403, done);
  });
});
