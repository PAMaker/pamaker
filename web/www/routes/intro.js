var http = require('http')
var url = require('url')
var querystring = require('querystring')
var qs = require('querystring')
var temintro = require('../lib/temintro.js')
var topic = require('../lib/topic')
var express = require('express')
var router = express.Router()
//var auth = require('../lib/auth')
var db2 = require('../lib/db2') //heidy db

//각각의 리스트를 눌렀을때
//localhost:8080/fav
router.get('/', function (request, response) {
  var _url = request.url
  var queryData = url.parse(_url, true).query
  var pathname = url.parse(_url, true).pathname

  //var id = parseUrl.substring(parseUrl.lastIndexOf("=")+1);
  //console.log(id);

  if (pathname === '/') {
      db2.query(`SELECT * FROM topic`, function (error, topics) {
        console.log(topics)

        //console.log(topic);
        if (error) {
          throw error
        }
        db2.query(
          `SELECT * FROM topic LEFT JOIN customer ON topic.id=customer.id WHERE topic.id=?`,
          [queryData.id],
          function (error2, topic) {
            if (error2) {
              throw error2
            }
            console.log(topic)  
            var list = temintro.list(topic)
            var html = temintro.HTML(
                list
            )
            response.send(html)
          },

        )
      })
    
  }
})

module.exports = router
