const { request, app, data } = require('../../../tests/setup');
const router = require('../../../routes/user');

beforeAll(() => {
  app.use('/', router);
});

describe('getAllChats', () => {
  it("returns user's chats", async () => {
    const user = data.users[0];
    return request(app)
      .get(`/${user.id}/chats`)
      .then((res) => {
        expect(res.body.chats.length).toBe(user.chats.length);
      });
  });

  it("returns 403 when trying to access other user's chats", (done) => {
    request(app).get(`/${data.users[1].id}/chats`).expect(403, done);
  });
});
