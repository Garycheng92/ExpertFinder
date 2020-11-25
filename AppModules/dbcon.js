var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361_murrayho',
  password        : '8435',
  database        : 'cs361_murrayho'
});

module.exports.pool = pool;