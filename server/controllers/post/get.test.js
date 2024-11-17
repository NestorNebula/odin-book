const { request, app, data } = require('../../tests/setup');
const router = require('../../routes/post');

beforeAll(() => app.use('/', router));

describe('getPost', () => {
  it('returns post', async () => {
    const post = data.posts[0];
    return request(app)
      .get(`/${post.id}`)
      .then((res) => {
        expect(res.body.post.main.content).toBe(post.content);
      });
  });

  it('returns 404 when trying to access a non-existent', (done) => {
    request(app)
      .get(`/${data.posts[0].id - 10}`)
      .expect(404, done);
  });
});
