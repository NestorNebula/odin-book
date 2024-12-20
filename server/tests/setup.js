const request = require('supertest');
const express = require('express');
const app = express();
const { data, populateDb, emptyDb } = require('./seeds');
const { setReqUser } = require('./reqUser');

beforeAll(async () => {
  await populateDb(data);
  setReqUser(app, data);
});

afterAll(async () => {
  await emptyDb();
});

app.use(express.urlencoded({ extended: false }));

module.exports = { request, app, data };
