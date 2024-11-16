const { request, app, data } = require('../../../tests/setup');
const router = require('../../../routes/user');

beforeAll(() => {
  app.use('/', router);
});

describe('getAllNotifications', () => {
  it("returns user's notifications", async () => {
    const user = data.users[0];
    request(app)
      .get(`/${user.id}/notifications`)
      .then((res) => {
        expect(res.body.notifications.length).toBe(user.notifications.length);
      });
  });

  it("returns 403 when trying to access other user's notifications", (done) => {
    request(app).get(`/${data.users[1].id}/notifications`).expect(403, done);
  });
});
