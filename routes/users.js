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
  res.send('post to create a user');
});

module.exports = router;
