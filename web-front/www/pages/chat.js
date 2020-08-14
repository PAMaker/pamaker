var fs = require('fs')
var mysql = require('mysql')

// db 연동
var connection = mysql.createConnection({
  host: 'management.c96otstrvsjv.us-east-2.rds.amazonaws.com',
  user: 'user',
  database: 'management_tutorial',
  password: 'eja959595~',
  port: 3306,
})

var user_name = ''
var photographer_name = ''
var chat_trigger = document.getElementById('chat_trigger')
chat_trigger.addEventListener(start_chat)

function start_chat() {
  console.log('start chat')
  connection.connect()

  // id = 3인 user의 name을 받아온다.
  var userList = {
    list: function (req, res) {
      var sql = 'SELECT name FROM chat_test WHERE id = 3'
      connection.query(sql, function (err, results, field) {
        res.render('./user_list')
      })
    },
  }
  module.exports = userList

  var url =
    'http://localhost:3333/chat.html?username=' +
    user_name +
    '&room=' +
    photographer_name
}
