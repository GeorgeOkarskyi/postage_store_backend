const http = require('http');
const { router } = require('./src/router');

const PORT = 8000;

const server = http.createServer((req, res) => {
  router(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('Stopping the server...');
  server.close(() => {
    process.exit(0);
  });
});