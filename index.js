const http = require('http');
const port = 3000;

const requestHandler = (req, res) => {
    if (req.method === 'GET' && req.url === '/api/greet') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello, World!' }));
    } else if (req.method === 'POST' && req.url === '/api/greet') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const parsedBody = JSON.parse(body);
            const name = parsedBody.name;
            if (name) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `Hello, ${name}!` }));
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Name is required' }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
};

const server = http.createServer(requestHandler);
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
