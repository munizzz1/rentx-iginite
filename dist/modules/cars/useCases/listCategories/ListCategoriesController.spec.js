"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _bcryptjs = require("bcryptjs");

var _uuid = require("uuid");

var _app = require("@shared/infra/http/app");

var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe('List Category Controller', () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcryptjs.hash)('admin', 8);
    await connection.query(`
            INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
             values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXX')
        `);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should be able to list all categories', async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    });
    const {
      refresh_token
    } = responseToken.body;
    await (0, _supertest.default)(_app.app).post('/categories').send({
      name: 'Category Test',
      description: 'Category Test'
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    await (0, _supertest.default)(_app.app).post('/categories').send({
      name: 'Category Test2',
      description: 'Category Test2'
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    const responseListCategories = await (0, _supertest.default)(_app.app).get('/categories');
    expect(responseListCategories.status).toBe(200);
    expect(responseListCategories.body.length).toBe(2);
  });
});