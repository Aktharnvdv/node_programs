const request = require('supertest');
const http = require('http');
const app = require('../app'); 

let server;
let port;

beforeAll(() => {
  port = 3001; 
  server = http.createServer(app);
  server.listen(port, () => {
    console.log(`Test server running at http://localhost:${port}/`);
  });
});

afterAll(done => {
  server.close(done);
});

describe('GET /api/greet', () => {
  jest.setTimeout(10000); 

  it('should return a greeting message', async () => {
    const response = await request(server).get('/api/greet');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, World!' });
  });
});

describe('POST /api/greet', () => {
  jest.setTimeout(10000); 

  it('should return a personalized greeting message', async () => {
    const response = await request(server)
      .post('/api/greet')
      .send({ name: 'Alice' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, Alice!' });
  });

  it('should return an error if name is missing', async () => {
    const response = await request(server)
      .post('/api/greet')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Name is required' });
  });
});
