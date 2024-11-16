const { request, app, data } = require('../../../../tests/setup');
const router = require('../../../../routes/user');

beforeAll(() => {
  app.use('/', router);
});

describe('postMessage', () => {
  it('returns message after its creation', async () => {
    const user = data.users[0];
    return request(app)
      .post(`/${user.id}/chats/${user.chats[0].id}/messages`)
      .send({ content: 'This is a message.', file: '' })
      .type('form')
      .then((res) => {
        expect(res.body.message.content).toBe('This is a message.');
        expect(res.body.message.file).toBeNull();
      });
  });

  it('returns 403 when trying to post a message for another user', (done) => {
    request(app)
      .post(`/${data.users[1].id}/chats/${data.users[1].chats[0].id}/messages`)
      .send({ content: 'This is a message.', file: '' })
      .type('form')
      .expect(403, done);
  });

  it('returns 400 when no data is provided', (done) => {
    request(app)
      .post(`/${user.id}/chats/${user.chats[0].id}/messages`)
      .expect(400, done);
  });
});
