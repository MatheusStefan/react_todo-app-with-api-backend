const http = require("node:http");
const express = require('express');
const todosRouter = require('./routes/todosRouter.js')
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(`/todos`, todosRouter);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})