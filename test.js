const http = require('http');
const assert = require('assert');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/greet',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    assert.strictEqual(res.statusCode, 200);
    const response = JSON.parse(data);
    assert.strictEqual(response.message, 'Hello, World!');
    console.log('Tests passed!');
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();
