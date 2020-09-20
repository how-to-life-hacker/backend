const { json } = require('express');
const express = require('express');

//ROUTERS

const authRouter = require('../auth/auth-router')

const server = express();

server.use(express.json())


server.use(logger)
server.get('/', (req, res) => {
  res.status(200).json({ message: 'API up and running'})
});

server.use('/api/auth', authRouter);


function logger(req, res, next) {
    console.log(`You made a ${req.method} request to the  ${req.url} endpoint at ${new Date()}`)
    next()
}

module.exports = server;
