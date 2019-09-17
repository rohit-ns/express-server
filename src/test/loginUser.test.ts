import * as supertest from 'supertest';
import { Database } from '../libs/Database';
import { config } from '../config';
import { Server } from '../Server';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();
const server = new Server(config);
const request = supertest(server.application());
let token;
describe('MAIN LOGIN', () => {
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
  test('Should User login successfully', async (done) => {
    const res = await request
      .post('/api/user/login')
      .set('Accept', 'application/json')
      .send({
        email: 'rohit@successive.tech',
        password: 'Training@123',
      });
    console.log('11111', res.body);
    expect(res.body.status).toEqual(200);
    expect(res.body.message).toEqual('Login Successfully');
    done();
  });

  test("try to login with incorrect email ", async (done) => {
    const res = await request
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        email: 'rohit@successiv.tech',
        password: 'Training@123'
      });
    console.log('22222', res.body)
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Bad Request');
    expect(res.body.message).toEqual(['email is not correct']);
    expect(res.body.status).toEqual(422);
    done();
  });

  test("try to login with incorrect password ", async (done) => {
    const res = await request
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        email: 'rohit@successive.tech',
        password: "Trainer@12"
      });
    console.log('33333', res.body)
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Invalid Details');
    expect(res.body.message).toEqual('Password does not match');
    expect(res.body.status).toEqual(422);
    done();
  });

  test("try to login with null password ", async (done) => {
    const res = await request
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        email: 'rohit@successive.tech',
        password: ''
      });
    console.log('44444', res.body)
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Bad Request');
    expect(res.body.status).toEqual(422);
    done();
  });
  test("try to login with null email ", async (done) => {
    const res = await request
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        email: '',
        password: 'Training@123'
      });
    console.log('55555', res.body)
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Bad Request');
    expect(res.body.message).toEqual(['Email cannot be empty']);
    expect(res.body.status).toEqual(422);
    done();
  });
  test("try to login with null body", async (done) => {
    const res = await request
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({});
    console.log('55555', res.body)
    expect(res.body).toHaveProperty('error');
   // expect(res.body.error).toEqual('Bad request');
    expect(res.body.message).toEqual([ 'email is required', 'password is required' ]);
    expect(res.body.status).toEqual(422);
    done();
  });
  test("try to login with only email", async (done) => {
    const res = await request
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        email: 'rohit@successive.tech'
      });
    console.log('66666', res.body)
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Bad Request');
    expect(res.body.message).toEqual(['password is required']);
    expect(res.body.status).toEqual(422);
    done();
  });
});
