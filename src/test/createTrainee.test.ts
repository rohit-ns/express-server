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
  test('Should Trainee login successfully', async (done) => {
    const res = await request
      .post('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization',token)
      .send({
        name:'ramuuuu',
        email: 'fghfdghgf@successive.tech',
        password: 'Training@123',

      });
    console.log('trainee-111', res.body);
    expect(res.body.status).toEqual(200);
    expect(res.body.message).toEqual('Trainee Created Successfully');
    done();
  });

  test("try to create with incorrect email ", async (done) => {
    const res = await request
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        email: 'rohit@successiv.tech',
        password: 'Training@123'
      });
    console.log('trainee-22', res.body)
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Bad Request');
    expect(res.body.message).toEqual(['email is not correct']);
    expect(res.body.status).toEqual(422);
    done();
  });

  test("try to create with incorrect password ", async (done) => {
    const res = await request
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        email: 'rohit@successive.tech',
        password: "Trainer@12"
      });
    console.log('trainee-33', res.body)
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Invalid Details');
    expect(res.body.message).toEqual('Password does not match');
    expect(res.body.status).toEqual(422);
    done();
  });
  test("try to create with incorrect name ", async (done) => {
    const res = await request
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        email: 'rohit@successive.tech',
        password: "Trainer@12"
      });
    console.log('trainee-44', res.body)
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Invalid Details');
    expect(res.body.message).toEqual('Password does not match');
    expect(res.body.status).toEqual(422);
    done();
  });

  test("try to create with null password ", async (done) => {
    const res = await request
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        email: 'rohit@successive.tech',
        password: ''
      });
    console.log('trainee-55', res.body)
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Bad Request');
    expect(res.body.status).toEqual(422);
    done();
  });
  test("try to create with null email ", async (done) => {
    const res = await request
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        email: '',
        password: 'Training@123'
      });
    console.log('trainee-66', res.body)
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Bad Request');
    expect(res.body.message).toEqual(['Email cannot be empty']);
    expect(res.body.status).toEqual(422);
    done();
  });
  test("try to create with null name ", async (done) => {
    const res = await request
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        email: '',
        password: 'Training@123'
      });
    console.log('trainee-77', res.body)
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Bad Request');
    expect(res.body.message).toEqual(['Email cannot be empty']);
    expect(res.body.status).toEqual(422);
    done();
  });
  test("try to create with null body", async (done) => {
    const res = await request
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({});
    console.log('trainee--88', res.body)
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Bad Request');
    expect(res.body.message).toEqual(['email is required', 'password is required']);
    expect(res.body.status).toEqual(422);
    done();
  });
  test("try to create with only email", async (done) => {
    const res = await request
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        email: 'rohit@successive.tech'
      });
    console.log('trainee--99', res.body)
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Bad Request');
    expect(res.body.message).toEqual(['password is required']);
    expect(res.body.status).toEqual(422);
    done();
  });
  test("try to create with only password", async (done) => {
    const res = await request
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        email: 'rohit@successive.tech'
      });
    console.log('trainee-100', res.body)
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Bad Request');
    expect(res.body.message).toEqual(['password is required']);
    expect(res.body.status).toEqual(422);
    done();
  });
  test("try to create with only name", async (done) => {
    const res = await request
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        email: 'rohit@successive.tech'
      });
    console.log('trainee-200', res.body)
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Bad Request');
    expect(res.body.message).toEqual(['password is required']);
    expect(res.body.status).toEqual(422);
    done();
  });
  test('try to create with wrong token', async (done) => {
    const res = await request
      .post('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization',`${token}eee`)
      .send({
        name:'ramuuuu',
        email: 'ram@successive.tech',
        password: 'Training@123',

      });
    console.log('trainee-token', res.body);
    expect(res.body.status).toEqual(403);
    expect(res.body.message).toEqual('Token Expired');
    done();
  });
});
