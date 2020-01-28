var express = require('express');
var router = express.Router();
const sql = require('mssql')
const config = {
  user: 'bellati.samuele',
  password: 'xxx123#',
  server: "213.140.22.237",
  /* database: 'School' */
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/unita', function(req, res, next) {
  sql.connect(config, err => {
    if(err) console.log(err);
    let sqlRequest = new sql.Request();
    sqlRequest.query('SELECT * FROM [cr-unit-attributes]', (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
  });
});

router.get('/unita/:nome', function(req, res, next) {
  sql.connect(config, err => {
    if(err) console.log(err);
    let sqlRequest = new sql.Request();
    sqlRequest.query(`SELECT * FROM [cr-unit-attributes] WHERE Unit = '${req.params.nome}'`, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
  });
});

module.exports = router;
