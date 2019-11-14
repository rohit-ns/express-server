import * as supertest from 'supertest';
import { config } from '../config';
import { Server } from '../Server';

const server = new Server(config);
const request = supertest(server.application());
describe('MAIN DESCRIBE', () => {
  beforeAll((done) => {
    server.bootstrap();
    done();
  });
  test('Database and Server Connection', async (done) => {
    const res = await request.get('/health-check');
    console.log('In health check', res.text);
    expect(res.statusCode).toBe(200);
    done();

  });
});
