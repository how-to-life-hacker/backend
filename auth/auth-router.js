const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const constants = require("../config/constants.js");

const router = require('express').Router();

const Users = require('../users/users-model')

router.post('/register', (req, res) => {
  // implement registration
  const credentials = req.body

  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcryptjs.hashSync(credentials.password, rounds);

  credentials.password = hash;

  Users.add(credentials)
    .then(user => {
      res.status(200).json({ message: user })
    })
    .catch(err => {
      res.status(500).json({ message: err.message})
    })
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;
  Users.findBy({ username: username })
  .then(([user]) => {
      // compare the password the hash stored in the database
      if (user && bcryptjs.compareSync(password, user.password)) {
          const token = signToken(user);

          res.status(200).json({
              message: "Welcome to our API",
              token,
          });
      } else {
          res.status(401).json({ message: "Invalid credentials" });
      }
  })
  .catch(error => {
      res.status(500).json({ message: error.message });
  });
});

function signToken(user) {
  const payload = {
      subject: user.id,
      username: user.username,
      role: user.role,
  };

  const secret = constants.jwtSecret;

  const options = {
      expiresIn: "2d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
