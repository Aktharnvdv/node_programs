const request = require('supertest');
const http = require('http');
const index = require('../index'); 

const port = 3000;
const server = http.createServer(index);

describe('GET /api/greet', () => {
    it('should return a greeting message', async () => {
        const response = await request(server).get('/api/greet');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Hello, World!' });
    });
});

describe('POST /api/greet', () => {
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
