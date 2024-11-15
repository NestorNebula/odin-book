const { request, app, data } = require('../../../tests/setup');
const router = require('../../../routes/user');

beforeAll(() => {
  app.use('/', router);
});

describe('putProfile', () => {
  it('returns profile after successful update', async () => {
    return request(app)
      .put(`/${data.users[0].id}/profile`)
      .send({
        displayName: 'My new Name',
        avatar: '',
        background: '',
        bio: '',
        website: '',
        location: 'United States',
      })
      .type('form')
      .then((res) => {
        expect(res.body.profile.displayName).toBe('My new Name');
      });
  });

  it('returns 400 with error when submitting incorrect data', async () => {
    return request(app)
      .put(`/${data.users[0].id}/profile`)
      .send({
        displayName:
          "My new and very long displayName. This shouldn't be valid.",
        avatar: 'http://aninvalidurl.com',
        background: '',
        bio: 'A very short bio.',
        website: '',
        location: 'Canada',
      })
      .type('form')
      .expect(400)
      .then((res) => {
        expect(res.body.errors[0].msg).toMatch(/50 characters/i);
        expect(res.body.errors[1].msg).toMatch(/url isn't valid/i);
      });
  });

  it("returns 403 when trying to update another user's profile", async () => {
    return request(app)
      .put(`/${data.users[0].id + 1}/profile`)
      .send({
        displayName: 'My new Name',
        avatar: '',
        background: '',
        bio: '',
        website: '',
        location: 'Italy',
      })
      .type('form')
      .expect(403);
  });
});
