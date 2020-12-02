var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'expertfinder.cflvftqirmoz.us-east-1.rds.amazonaws.com',
  user            : 'masteruser',
  password        : 'expertfinder',
  database        : 'expertfinderdb'
});

module.exports.pool = pool;