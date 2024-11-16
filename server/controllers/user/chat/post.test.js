const { request, app, data } = require('../../../tests/setup');
const router = require('../../../routes/user');

beforeAll(() => {
  app.use('/', router);
});

describe('postChat', () => {
  it('returns chat after successful creation', async () => {
    return request(app)
      .post(`/${data.users[0].id}/chats`)
      .send({ userId: data.users[1].id })
      .type('form')
      .then((res) => {
        expect(res.body.chat.users.length).toBe(2);
        expect(
          res.body.chat.users.some((u) => u.id === data.users[0].id) &&
            res.body.chat.users.some((u) => u.id === data.users[1].id)
        ).toBeTruthy();
      });
  });

  it('returns 403 when trying to create chat for another user', (done) => {
    request(app)
      .post(`/${data.users[1].id}/chats`)
      .send({ userId: data.users[0].id })
      .type('form')
      .expect(403, done);
  });
});
