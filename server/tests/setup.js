const request = require('supertest');
const express = require('express');
const app = express();
const { data, populateDb, emptyDb } = require('./seeds');

beforeAll(async () => {
  await populateDb(data);
});

afterAll(async () => {
  await emptyDb();
});

module.exports = { request, app, data };
