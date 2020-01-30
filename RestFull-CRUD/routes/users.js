var express = require('express');
var router = express.Router();
const sql = require('mssql');
var createError = require('http-errors');
const config = {
  user: 'bellati.samuele',
  password: 'xxx123#',
  server: "213.140.22.237",
  /* database: 'School' */
};

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

router.post('/', function (req, res, next) {
  console.log(req.body);
  let unit = req.body;
  if (!unit) {
    next(createError(400 , "Please provide a correct unit"));
  }
  sql.connect(config, err => {
    let sqlInsert = `INSERT INTO dbo.[cr-unit-attributes] (Unit, Cost, Hit_Speed, Speed) VALUES ('${unit.Unit}','${unit.Cost}','${unit.Hit_Speed}','${unit.Speed}')`;
    let sqlRequest = new sql.Request();
    sqlRequest.query(sqlInsert, (error, results) => {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
  })
});

module.exports = router;