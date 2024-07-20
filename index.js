const http = require('http');
const port = 3000;

// Request handler function
const requestHandler = (req, res) => {
    if (req.method === 'GET' && req.url === '/api/greet') {
        // Handle GET request to /api/greet
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello, World!' }));
    } 
    else if (req.method === 'POST' && req.url === '/api/greet') {
        // Handle POST request to /api/greet
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
    } 
    else {
        // Handle any other routes
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
};

// Create the server
const server = http.createServer(requestHandler);

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
