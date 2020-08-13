var fs = require('fs')
var mysql = require('mysql')

// const { now } = require('moment')
var connection = mysql.createConnection({
  host: 'management.c96otstrvsjv.us-east-2.rds.amazonaws.com',
  user: 'user',
  database: 'management_tutorial',
  password: 'eja959595~',
  port: 3306,
})

var start_chat_btn = document.getElementById('start_chat')
// const db_connection = require('./db')

connection.connect()

// start_chat_btn.addEventListener(load_chat)

function load_chat() {
  console.log('함수 실행1')
  //   const jsonFile = fs.readFileSync('./user_db.json', 'utf-8')
  //   const jsonData = JSON.parse(jsonFile)

  //   console.log(jsonData)

  //   if (jsonData.match('displayName', 'yujinbyeon')) {
  //     console.log('회원 목록에 있습니다.')
  //   }
  //   //   connection.query(
  //   //     'SELECT id chat_test where id = 'yujinbyeon'

  //   //      TODO

  //   //     function () {
  //   //       //console.log('Data Insert OK');
  //   //     }
  //   //   )
  //   console.log('함수 실행됨')
}
