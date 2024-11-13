const { request, app, data } = require('../../tests/setup');
const router = require('../../routes/user');
const prisma = require('../../models/queries');

const mockUser = data.users[0];
let user = null;
beforeAll(async () => {
  user = await prisma.__findFullUserByUsername(mockUser.username);
});
app.use(async (req, res, next) => {
  req.user = { id: user.id };
  next();
});
app.use('/', router);

describe('getAllUsers', () => {
  it('returns all users', () => {
    return request(app)
      .get('/')
      .then((res) => {
        expect(res.body.users.length).toBe(data.users.length);
        expect(
          data.users.every((usr) =>
            res.body.users.some((u) => u.username === usr.username)
          )
        ).toBeTruthy();
      });
  });

  it('it only returns non-followed users on query', () => {
    return request(app)
      .get('/')
      .query({ omit: 'friends' })
      .then((res) => {
        expect(
          user.following.every((usr) =>
            res.body.users.every((u) => u.username !== usr.username)
          )
        ).toBeTruthy();
      });
  });

  it('only returns users matching search query', () => {
    return request(app)
      .get('/')
      .query({ search: data.users[1].username })
      .then((res) => {
        const regExp = new RegExp(data.users[1].username);
        data.users.forEach((usr) => {
          if (regExp.test(usr.username)) {
            expect(
              res.body.users.some((u) => u.username === usr.username)
            ).toBeTruthy();
          } else {
            expect(
              res.body.users.every((u) => u.username !== usr.username)
            ).toBeTruthy();
          }
        });
      });
  });

  it("doesn't return more than limit query", () => {
    return request(app)
      .get('/')
      .query({ limit: 1 })
      .then((res) => {
        expect(res.body.users.length).toBe(1);
      });
  });
});
