const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../db.json')); // Path to your db.json
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running on http://localhost:3001');
});
