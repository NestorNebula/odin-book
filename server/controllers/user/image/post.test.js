const { request, app, data } = require('../../../tests/setup');
const router = require('../../../routes/user');

beforeAll(() => app.use('/', router));

jest.mock('../../../helpers/supabase.js', () => {
  return {
    uploadFile: () => {
      return {
        link: 'https://fakelink.com',
        error: false,
      };
    },
  };
});

describe('postImage', () => {
  it('returns image url after successful upload', async () => {
    return request(app)
      .post(`/${user.id}/images`)
      .send({ type: 'photos', fileName: 'file', file: new ArrayBuffer(64) })
      .type('form')
      .then((res) => {
        expect(res.body.url).toBe('https://fakelink.com');
      });
  });

  it('returns 400 when no file is provided', (done) => {
    request(app)
      .post(`/${user.id}/images`)
      .send({ type: 'photos', fileName: 'file' })
      .expect(400, done);
  });
});
