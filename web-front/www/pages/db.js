var mysql = require('mysql')

const { now } = require('moment')
var connection = mysql.createConnection({
  host: 'management.c96otstrvsjv.us-east-2.rds.amazonaws.com',
  user: 'user',
  database: 'management_tutorial',
  password: 'eja959595~',
  port: 3306,
})
