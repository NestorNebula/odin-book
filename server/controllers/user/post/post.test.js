const { request, app, data } = require('../../../tests/setup');
const router = require('../../../routes/user');

beforeAll(() => app.use('/', router));

describe('postPost', () => {
  it('returns created post', async () => {
    const user = data.users[0];
    return request(app)
      .post(`/${user.id}/posts`)
      .send({ content: 'This is a post.', file: '' })
      .type('form')
      .then((res) => {
        expect(res.body.post.content).toBe('This is a post.');
        expect(res.body.post.file).toBeNull();
        expect(res.body.post.commentedPostId).toBeNull();
      });
  });

  it('returns created comment', async () => {
    const user = data.users[0];
    return request(app)
      .post(`/${user.id}/posts`)
      .send({
        content: 'This is a comment.',
        file: '',
        postId: user.posts[0].id,
      })
      .type('form')
      .then((res) => {
        expect(res.body.comment.content).toBe('This is a comment.');
        expect(res.body.comment.file).toBeNull();
        expect(res.body.comment.commentedPostId).toBe(user.posts[0].id);
      });
  });

  it('returns 400 when no data is provided', (done) => {
    request(app).post(`/${data.users[0].id}/posts`).expect(400, done);
  });

  it('returns 403 when trying to post a message as another user', (done) => {
    request(app).post(`/${data.users[1].id}/posts`).expect(403, done);
  });
});
