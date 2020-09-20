const { json } = require('express');
const express = require('express');

//ROUTERS



const server = express();

server.use(express.json())


server.use(logger)
server.get('/', (req, res) => {
  res.status(200).json({ message: 'API up and running'})
});




function logger(req, res, next) {
    console.log(`You made a ${req.method} request to the  ${req.url} endpoint at ${new Date()}`)
    next()
}

module.exports = server;
