import * as supertest from 'supertest';
import { Database } from '../libs/Database';
import { config } from '../config';
import { Server } from '../Server';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();
const server = new Server(config);
const request = supertest(server.application());
let token;
describe('MAIN', () => {
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
    console.log('---------------', res.body);
    const { body: { status, data, message, error } } = res;
    token = data;
    done();
  });
  test('Should User get successfully', async (done) => {
    const res = await request
      .get('/api/user/me')
      .set('Accept', 'application/json')
      .set('Authorization',token)
    console.log('get-11', res.body);
    expect(res.body.status).toEqual(200);
    expect(res.body.message).toEqual('User get Successfully');
    done();
  });
  test('try to get user with invalid token', async (done) => {
    const res = await request
      .get('/api/user/me')
      .set('Accept', 'application/json')
      .set('Authorization','invalidtoken')
    console.log('get-11', res.body);
    expect(res.body.status).toEqual(403);
    expect(res.body.message).toEqual('Token Expired');
    done();
  });
});