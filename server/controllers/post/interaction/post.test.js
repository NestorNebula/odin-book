const { request, app, data } = require('../../../tests/setup');
const router = require('../../../routes/post');

beforeAll(() => app.use('/', router));

describe('postInteraction', () => {
  it('returns created interaction', async () => {
    const post = data.posts.find((p) =>
      data.users[0].interactions.every(
        (i) => i.type !== 'REPOST' || i.postId !== p.id
      )
    );
    return request(app)
      .post(`/${post.id}/interactions`)
      .send({ type: 'REPOST' })
      .type('form')
      .then((res) => {
        expect(res.body.interaction.postId).toBe(post.id);
        expect(res.body.interaction.userId).toBe(data.users[0].id);
        expect(res.body.interaction.type).toBe('REPOST');
      });
  });
});
