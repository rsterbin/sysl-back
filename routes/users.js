var express = require('express');
var router = express.Router();
var { pgAdapter } = require('../lib/pgAdapter.js');

/* GET users listing. */
router.get('/', function(req, res, next) {

    const dbh = pgAdapter();
    const queryText = 'SELECT * from pronouns';
    dbh.query(queryText)
        .then((response) => {
            console.log(response);
            dbh.end();
            var buffer = '<ul>';
            for (var i = 0; i < response.rows.length; ++i) {
                var row = response.rows[i];
                var num = i + 1;
                buffer += '<li>Row #' + num + '<ul>';
                for (var k in row) {
                    buffer += '<li>' + k + ': ' + row[k] + '</li>';
                }
                buffer += '</ul></li>';
            }
            res.send(buffer);
        })
        .catch((err) => {
            console.log(err);
            dbh.end();
            res.send('There was an error: ' + err);
        });

});

/* POST users create */
router.post('/', function(req, res, next) {
    console.log(req.body);
  // TODO: Set up this endpoint to create a user

  res.send('post to create a user');
});

module.exports = router;
