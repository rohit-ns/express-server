import * as supertest from 'supertest';
import { Database } from '../libs/Database';
import { config } from '../config';
import { Server } from '../Server';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();
const server = new Server(config);
const request = supertest(server.application());
let token;
let id;

describe('Update trainee details', () => {
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
    id = res.body.data.originalId;
    done();
  });
  test('try to update trainee successfully', async (done) => {
    const res = await request
      .put('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        dataToUpdate: {
          name: 'rajeev'
        },
        id
      });
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.id).toEqual(id);
    expect(res.status).toEqual(200);
    expect(res.body.message).toMatch('Trainee update successfully');
    done();
  });
  test('try to update trainee with existing email', async (done) => {
    const res = await request
      .put('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        dataToUpdate: {
          email: 'rohit@successive.tech'
        },
        id
      });
    console.log('update-11', res.body);
    expect(res.body).toHaveProperty('error');
    expect(res.body.status).toEqual(404);
    expect(res.body.message).toMatch('email already exist');
    done();
  });
  test('try to update trainee without inputs', async (done) => {
    const res = await request
      .put('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization', token);
    console.log('update-22', res.body);
    expect(res.body).toHaveProperty('error');
    expect(res.body.status).toEqual(422);
    expect(res.body.message).toContain('dataToUpdate is required');
    expect(res.body.message).toContain('id is required');
    done();
  });
  test('try to update trainee with wrong dataToUpdate type', async (done) => {
    const res = await request
      .put('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        dataToUpdate: {
          email: 'testing@gmail.com',
          name: 'testing@!',
          password: ''
        },
        id: '123455677'
      });
    console.log('update-33', res.body);
    expect(res.body).toHaveProperty('error');
    expect(res.body.status).toEqual(422);
    expect(res.body.message).toContain('Email is not in correct format');
    done();
  });
  test('try to update without any dataToUpdate field', async (done) => {
    const res = await request
      .put('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        dataToUpdate: {},
        id: ''
      });
    console.log('update-44', res.body);
    expect(res.body).toHaveProperty('error');
    expect(res.body.status).toEqual(422);
    expect(res.body.message).toContain('dataToUpdate is required');
    done();
  });
  test('try to update trainee with wrong token', async (done) => {
    const res = await request
      .put('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization', `${token}ddd`)
      .send({
        dataToUpdate: {
          name: 'rajeev111'
        },
        id
      });
      console.log('update-55', res.body);
    expect(res.body.status).toEqual(403);
    expect(res.body.message).toMatch('Token Expired');
    done();
  });
});