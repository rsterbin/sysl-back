var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST users create */
router.post('/', function(req, res, next) {
  console.log(req.body);
  console.log(process.env.RDS_HOSTNAME); // TODO: let app switch between RDS and local postgres

  // TODO: Create a db user with appropriate permissions for localhost:sysl
  // TODO: Using hardcoded connection info, connect to sysl and select pronouns (the only table that currently has data)
  // TODO: Figure out where config data should be stored in EB/Express
  // TODO: Set up switching between use of localhost and RDS according to the current environment
  // TODO: Set up this endpoint to create a user

  res.send('post to create a user');
});

module.exports = router;
