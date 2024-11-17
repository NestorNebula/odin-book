const { request, app, data } = require('../../../tests/setup');
const router = require('../../../routes/post');

beforeAll(() => app.use('/', router));

describe('deleteInteraction', () => {
  it('returns deleted interaction', async () => {
    const post = data.posts.find((p) =>
      data.users[0].interactions.some(
        (i) => i.postId === p.id && i.type === 'LIKE'
      )
    );
    return request(app)
      .delete(`/${post.id}/interactions`)
      .send({ type: 'LIKE' })
      .type('form')
      .then((res) => {
        expect(res.interaction.userId).toBe(data.users[0].id);
        expect(res.interaction.postId).toBe(post.id);
        expect(res.interactions.type).toBe('LIKE');
      });
  });
});
