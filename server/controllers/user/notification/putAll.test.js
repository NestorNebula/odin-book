const { request, app, data } = require('../../../tests/setup');
const router = require('../../../routes/user');

beforeAll(() => {
  app.use('/', router);
});

describe('putAllNotifications', () => {
  it('returns updated notifications', async () => {
    return request(app)
      .put(`/${data.users[0].id}/notifications`)
      .then((res) => {
        expect(res.body.notifications.every((n) => !!n.seen)).toBeTruthy();
      });
  });

  it("returns 403 when trying to update other user's notifications", (done) => {
    request(app).put(`/${data.users[1].id}/notifications`).expect(403, done);
  });
});
