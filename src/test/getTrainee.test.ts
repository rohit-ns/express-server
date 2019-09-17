import * as supertest from 'supertest';
import { Database } from '../libs/Database';
import { config } from '../config';
import { Server } from '../Server';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();
const server = new Server(config);
const request = supertest(server.application());
let token;

describe('fetch all trainee details', () => {
  beforeAll(async (done) => {
    server.bootstrap();
    const uri = await mongod.getConnectionString();
    await Database.open(uri);
    const res = await request
      .post('/api/user/login')
      .set('Accept', 'application/json')
      .send({
        email: 'rohit@successive.tech',
        password: 'Training@123'
      });
    token = res.body.data;
    done();
  });
  beforeAll(async (done) => {
    const res = await request
      .post('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        email: 'mohan@successive.tech',
        name: 'mohan',
        password: 'Training@123'
      });
    done();
  });
  beforeAll(async (done) => {
    const res = await request
      .post('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        email: 'rohan@successive.tech',
        name: 'rohan',
        password: 'Training@123'
      });
    done();
  });

  test('try to get all trainees successfully', async (done) => {
    const res = await request
      .get('/api/trainee')
      .set('Authorization', token)

    console.log('gettrainee-11', res.body);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('records');
    expect(res.body.data.count).toEqual(2);
    expect(res.status).toEqual(200);
    expect(res.body.message).toMatch('Successfully fetched Trainees');
    done();
  });

  test('try to get all trainees with limit', async (done) => {
    const res = await request
      .get('/api/trainee/?limit=1')
      .set('Authorization', token);

    console.log('gettrainee-22', res.body);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('count');
    expect(res.body.data).toHaveProperty('records');
    expect(res.body.data.records.length).toBeLessThanOrEqual(1);
    done();
  });

  test('try to get all trainee with limit and skip', async (done) => {
    const res = await request
      .get('/api/trainee/?limit=1&skip=0')
      .set('Authorization', token);

    console.log('gettrainee-33', res.body);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('count');
    expect(res.body.data).toHaveProperty('records');
    expect(res.body.data.records.length).toBeLessThanOrEqual(1);
    expect(res.body.status).toEqual(200);
    done();
  });
  test('try to get all trainee by provide wrong limit ', async (done) => {
    const res = await request
      .get('/api/trainee/?limit=ewew')
      .set('Authorization', token);

    console.log('gettrainee-44', res.body);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Bad Request');
    expect(res.body.message).toEqual(['limit value must be number']);
    done();
  });
  test('try to get all trainee with wrong token', async (done) => {
    const res = await request
      .get('/api/trainee')
      .set('Authorization', 'wrongtoken');

    console.log('gettrainee-44', res.body);
    expect(res.body).toHaveProperty('error');
    expect(res.body.message).toEqual('Token Expired');
    expect(res.body.status).toEqual(403);
    done();
  });
});
