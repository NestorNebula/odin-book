const { request, app, data } = require('../../../tests/setup');
const router = require('../../../routes/user');

beforeAll(() => {
  app.use('/', router);
});

describe('getAllInteractions', () => {
  it("returns all user's likes", async () => {
    const user = data.users[0];
    return request(app)
      .get(`/${user.id}/interactions`)
      .query({ type: 'LIKE' })
      .then((res) => {
        expect(res.body.interactions.length).toBe(
          user.interactions.filter((i) => i.type === 'LIKE').length
        );
      });
  });

  it("returns all user's bookmarks", async () => {
    const user = data.users[0];
    return request(app)
      .get(`/${user.id}/interactions`)
      .query({ type: 'BOOKMARK' })
      .then((res) => {
        expect(res.body.interactions.length).toBe(
          user.interactions.filter((i) => i.type === 'BOOKMARK').length
        );
      });
  });

  it("returns 403 when trying to access to other user's interactions", (done) => {
    request(app)
      .get(`/${data.users[1].id}/interactions`)
      .query({ type: 'LIKE' })
      .expect(403, done);
  });
});
