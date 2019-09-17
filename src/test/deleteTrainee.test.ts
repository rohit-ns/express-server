import * as supertest from 'supertest';
import { Database } from '../libs/Database';
import { config } from '../config';
import { Server } from '../Server';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();
const server = new Server(config);
const request = supertest(server.application());
let token;

describe('Successfully Delete trainee ', () => {
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
    // console.log(token);
    done();
  });
  test('try to delete trainee successfully', async () => {
    const res = await request
      .post('/api/trainee')
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .send({
        email: 'mohit@successive.tech',
        name: 'mohit',
        password: 'mohit@123'
      });
    const id = res.body.data.originalId;
    const result = await request
      .delete(`/api/trainee/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(result.body).toHaveProperty('data');
    expect(result.body.data.id).toEqual(id);
    expect(result.status).toEqual(200);
    expect(result.body.message).toMatch('Trainee deleted successfully');
  });
  test('try to delete when id is wrong', async () => {
    const res = await request
      .delete(`/api/trainee/12345`)
      .set('Accept', 'application/json')
      .set('Authorization', token);
    expect(res.body).toHaveProperty('error');
    expect(res.body.status).toEqual(404);
    expect(res.body.message).toMatch('id not found for delete');
  });
  test('try to delete trainee with wrong token', async () => {
    const res = await request
      .post('/api/trainee')
      .set('Authorization',token)
      .set('Accept', 'application/json')
      .send({
        email: 'mohit1@successive.tech',
        name: 'mohit',
        password: 'mohit@123'
      });
    const id = res.body.data.originalId;
    const result = await request
      .delete(`/api/trainee/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `${token}fdfd`);
    expect(result.body.status).toEqual(403);
    expect(result.body.message).toMatch('Token Expired');
});
});