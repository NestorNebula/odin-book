const { request, app, data } = require('../../tests/setup');
const router = require('../../routes/user');
const prisma = require('../../models/queries');

let user = null;
beforeAll(async () => {
  user = await prisma.__findFullUserByUsername(data.users[0].username);
});
app.use((req, res, next) => {
  req.user = user;
  next();
});
app.use('/', router);

describe('getUser', () => {
  it('returns existing user', () => {
    return request(app)
      .get(`/${user.id}`)
      .then((res) => {
        expect(res.body.user.username).toBe(user.username);
      });
  });

  it('returns 404 when trying to get a non-existing user', (done) => {
    request(app)
      .get(`/${user.id - 1}`)
      .expect(404, done);
  });
});
