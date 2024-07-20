const assert = require('assert');
const http = require('http');
const port = 3000;

describe('GET /api/greet', () => {
  it('should return "Hello, World!"', (done) => {
    http.get(`http://localhost:${port}/api/greet`, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(JSON.parse(data).message, 'Hello, World!');
        done();
      });
    });
  });
});
