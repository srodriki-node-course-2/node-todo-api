const request = require('supertest');
const expect = require('chai').expect;
const { ObjectID } = require('mongodb');

const { app } = require('./../server');

describe('Application startup', () => {
  it('should be running', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  }) 
});