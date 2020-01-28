var express = require('express');
var router = express.Router();
const sql = require('mssql')
const config = {
  user: 'gottardo.joshua',
  password: 'xxx123#',
  server: "213.140.22.237",
  /* database: 'School' */
}

router.get('/attori', function(req, res, next) {
  sql.connect(config, err => {
    if(err) console.log(err);
    let sqlRequest = new sql.Request();
    sqlRequest.query('SELECT * FROM [School].[Person]', (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
  });
});

router.get('/attori/:name', function(req, res, next) {
  sql.connect(config, err => {
    if(err) console.log(err);
    let sqlRequest = new sql.Request();
    sqlRequest.query(`SELECT * FROM [School].[Person] where FirstName = '${req.params.name}'`, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
  });
});

module.exports = router;