var express = require('express');
var router = express.Router();
const sql = require('mssql');
var createError = require('http-errors');
const config = {
  user: 'gottardo.joshua',
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
    let sqlRequest = new sql.Request();
    let sqlInsert = `INSERT INTO dbo.[cr-unit-attributes] (Unit, Cost, Hit_Speed, Speed, Deploy_Time, Range, Target, Count, Transport, Type, Rarity) VALUES ('${unit.Unit}','${unit.Cost}','${unit.Hit_Speed}','${unit.Speed}', '${unit.Deploy_Time}', '${unit.Range}', '${unit.Target}', '${unit.Count}', '${unit.Transport}', '${unit.Type}', '${unit.Rarity}')`;
    sqlRequest.query(sqlInsert, (error, results) => {
        if (error) throw error;
        sqlRequest.query(`SELECT * FROM [cr-unit-attributes] WHERE Unit = '${unit.Unit}'`, (err, result) => {
            if (err) console.log(err);
            res.render('dettagli', { unita: result.recordsets[0][0] });
        });
    });
  })
});

module.exports = router;