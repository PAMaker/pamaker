var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var FileStore = require('session-file-store')(session) //세션 저장소

var app = express()

//app.use : 사용자 요청이 있을때 마다 안에 있는 함수 실행
//session 객체 정희
app.use(
  session({
    secret: 'asdgasdfsad',
    resave: false,
    saveUninitialized: true, //세션이 필요하지 않을때는 구동시키지 않는다
    store: new FileStore(),
  })
)

app.get('/', function (req, res, next) {
  console.log(req.session)
  if (req.session.num === undefined) {
    req.session.num = 1
  } else {
    req.session.num += 1
  }
  res.send('hello session')
})

app.listen(4000, function () {
  console.log('4000!')
})
