// var mysql = require('mysql')
// var db2 = require('../lib/db2')

// db 연동
// var connection = mysql.createConnection({
//   host: 'management.c96otstrvsjv.us-east-2.rds.amazonaws.com',
//   user: 'user',
//   database: 'management_tutorial',
//   password: 'eja959595~',
//   port: 3306,
// })

var uname = ''
var pname = 'dakoon'
var url = ''
document.getElementById('trigger').addEventListener('click', function (event) {
  alert('Hello')
})

// function start_chat(event) {
//   chat_trigger.setAttribute('href', 'photograper.html#gallery')
// connection.connect()
// connection.query(`SELECT * FROM customer WHERE id=1`, function (error, user) {
//   if (error) {
//     throw error
//   }
//   url = 'http://localhost:3333/chat.html?username=' + uname + '&room=' + pname
//   uname = user[0].name
//   chat_trigger.setAttribute('href', 'photograper.html#gallery')
// })
// }

// function start_chat(event) {
//   console.log('start chat')
//   connection.connect()

//   // id = 3인 user의 name을 받아온다.
//   var userList = {
//     list: function (req, res) {
//       var sql = 'SELECT name FROM chat_test WHERE id = 3'
//       connection.query(sql, function (err, results, field) {
//         res.render('./user_list')
//       })
//     },
//   }
//   module.exports = userList

// var url =
//   'http://localhost:3333/chat.html?username=' +
//   user_name +
//   '&room=' +
//   photographer_name

// var url =
//   `http://localhost:3333/chat.html?username=${user_name}&room=${photographer_name}`
// }
