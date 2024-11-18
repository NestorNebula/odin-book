const { request, app, data } = require('../../../tests/setup');
const router = require('../../../routes/user');
const { deleteFile } = require('../../../helpers/supabase');

beforeAll(() => app.use('/', router));

jest.mock('../../../helpers/supabase');

describe('deleteImage', () => {
  it('returns 200 after successfully deleting image', (done) => {
    deleteFile.mockImplementationOnce(() => {
      return { success: true };
    });
    request(app)
      .delete(`/${data.users[0].id}/images`)
      .send({
        url: `https://photos/fakelink-${data.users[0].username}.com`,
        type: 'photos',
      })
      .type('form')
      .expect(200, done);
  });

  it('returns 500 after error when deleting image', (done) => {
    deleteFile.mockImplementationOnce(() => {
      return { success: false };
    });
    request(app)
      .delete(`/${data.users[0].id}/images`)
      .send({
        url: `https://photos/fakelink-${data.users[0].username}.com`,
        type: 'photos',
      })
      .type('form')
      .expect(500, done);
  });

  it("returns 403 when trying to delete another user's image", (done) => {
    request(app)
      .delete(`/${data.users[0].id + 1}/images`)
      .send({
        url: `https://photos/fakelink-${data.users[0].username}.com`,
        type: 'photos',
      })
      .type('form')
      .expect(403, done);
  });
});
