const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Node Express Backend Pratice',
    description: 'Challenge from Mate Academy Brazil to create a server from scratch.'
  },
  host: 'localhost:3000/todos/'
};

const outputFile = './swagger-output.json';
const routes = ['src/routes/todosRouter.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
  require('./src/server.js');
});