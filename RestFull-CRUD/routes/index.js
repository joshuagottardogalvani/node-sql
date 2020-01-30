var express = require('express');
var router = express.Router();
const sql = require('mssql')
const config = {
  user: 'bellati.samuele',
  password: 'xxx123#',
  server: "213.140.22.237",
  /* database: 'School' */
}
const path = require('path');
const http = require('http');
const app= express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
