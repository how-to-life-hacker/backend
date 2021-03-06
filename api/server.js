const { json } = require('express');
const express = require('express');

//ROUTERS
const authenticate = require('../auth/authentication-middleware')
const authRouter = require('../auth/auth-router')
const howToRouter = require('../howtos/howto-router')
const stepsRouter = require('../steps/steps-router')
const server = express();

server.use(express.json())


server.use(logger)
server.get('/', (req, res) => {
  res.status(200).json({ message: 'API up and running'})
});

server.use('/api/auth', authRouter);
server.use('/api/howto', authenticate, howToRouter)
server.use('/api/steps', authenticate, stepsRouter)


function logger(req, res, next) {
    console.log(`You made a ${req.method} request to the  ${req.url} endpoint at ${new Date()}`)
    next()
}

module.exports = server;
