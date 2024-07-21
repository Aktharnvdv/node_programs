const request = require('supertest');
const http = require('http');
const index = require('../index'); // Adjust path if necessary

const port = 3000;
const server = http.createServer(index);

describe('Test Suite for /api/greet', () => {
  beforeAll((done) => {
    server.listen(port, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  test('GET /api/greet should respond with Hello, World!', async () => {
    const response = await request(server).get('/api/greet');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual({ message: 'Hello, World!' });
  });

  test('POST /api/greet with name should respond with Hello, <name>!', async () => {
    const response = await request(server)
      .post('/api/greet')
      .send({ name: 'Akthar' });
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual({ message: 'Hello, Akthar!' });
  });

  test('POST /api/greet without name should respond with error', async () => {
    const response = await request(server)
      .post('/api/greet')
      .send({});
    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual({ error: 'Name is required' });
  });

  test('GET /api/unknown should respond with 404 Not Found', async () => {
    const response = await request(server).get('/api/unknown');
    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual({ error: 'Not Found' });
  });
});
