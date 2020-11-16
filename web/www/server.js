const fs = require('fs') //databasejson 과 접속가능
const express = require('express') //express 모듈 사용하기 위함
//var parseurl = require('parseurl')
// const compression = require('compression');
const app = express() //express 모듈 app이라는 변수명으로 사용
const moment = require('moment')
const path = require('path')
const qs = require('querystring')
//var sanitizeHtml = require('sanitize-html');
//var template2 = require('./lib/template2.js');
const multer = require('multer')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mysql = require('mysql')
var helmet = require('helmet')
app.use(helmet())
//const data = fs.readFileSync('database.json');
//const conf = JSON.parse(data);
var router = express.Router()
var flash = require('connect-flash')
const socketio = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const io = socketio(server)
const db2 = require('./lib/db2')
const pauth = require('./lib/pauth')
var formidable = require('formidable')
var url = require('url');
const cors = require('cors');
//cors 허용
app.use(cors({ 
  origin(origin, callback) {
    callback(null, true)
  },
  credentials : true 
}));

//application/json 형태의 데이터 req.body에 저장
app.use(express.json());
//www-form-urlencode 형태의 데이터 req.body에 저장
app.use(express.urlencoded({ extended: false }));

//기본값
app.use(express.static('css'))
app.use(express.static('js'))
app.use(express.static('img'))
app.use(express.static('Semantic'))
app.use(express.static('pages'))
app.use(express.static('lib'))
app.use(express.static('static/html'))
app.use(express.static('static/js'))
app.use(express.static('static'))

///세션 인증
const session = require('express-session')
var FileStore = require('session-file-store')(session)
app.use(bodyParser.urlencoded({ extended: false }))

let currentUser = ''

app.use(
  session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
)
//flash 메시지
app.use(flash())

//passport 인증

//passport 구현한 부분
var passport = require('./lib/passport')(app)

//라우팅
//<고객>
//로그인기능(고객)
var authRouter = require('./routes/auth')(passport)
app.use('/auth', authRouter)
var myinfoRouter = require('./routes/mypage')
app.use('/mypage', myinfoRouter)
//작가
var pauthRouter = require('./routes/pauth')(passport)
app.use('/pauth', pauthRouter)
var pmyinfoRouter = require('./routes/pmypage')
app.use('/pmypage', pmyinfoRouter)
//사진업로드


//후기작성기능
var favRouter = require('./routes/fav')
app.use('/fav', favRouter)

//문의 기능
var qnaRouter = require('./routes/qna')
app.use('/qna', qnaRouter)

// var introRouter = require('./routes/intro__')
// app.use('/intro', introRouter)

//사진작가리스트 보여주기
var snapRouter = require('./routes/snap1')
app.use('/snap1', snapRouter)

//서비스 등록 기능
var serviceRouter = require('./routes/ser')
const { until } = require('async')
app.use('/ser', serviceRouter)

//고객채팅기능
var chatRouter = require('./routes/chat')
app.use('/chat', chatRouter)

//작가채팅기능
var chatRouter = require('./routes/pchat')
app.use('/pchat', chatRouter)

var pbRouter = require('./routes/photoobucket')
app.use('/photoobucket', pbRouter)

// var googlemapRouter = require('./routes/map')
// app.use('/map', googlemapRouter)

const formatMessage = require('./util/messages')
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require('./util/users')

// 실시간 지도 (realtime-map.html)
let markers = []
let userName = ''

io.on('connection', function (socket) {
  //클라이언트의 위치 정보를 받으면
  socket.on('location', function (location) {
    // addMarker(currentUser, location)

    console.log(markers)

    let idx 
    for (idx=0; idx<markers.length; idx++){
      if (markers[idx][0] == currentUser.email){
        break
      }
    }
    //이미 해당 유저 위치 정보가 수집되고 있는 경우 --> 정보를 갱신
    if (idx < markers.length-1) { 
        console.log('already exists!')
        markers[idx] = [
          currentUser.email,
          userName,
          location.latitude,
          location.longitude,
        ]
    }
    //새로운 유저의 위치 정보가 수집되는 경우 --> 정보를 추가
    else {
      console.log('new!')
      console.log('add: ' + location.latitude + ', ' + location.longitude)

      // email값으로 db에서 name 검색
      db2.query(
        `SELECT name FROM photographer WHERE email=?`,
        [currentUser.email],
        function (error, name) {
          if (error) {
            throw error
          }
          console.log(name[0].name)
          userName = name[0].name
        }
      )
      // 추가
      markers.push([
        currentUser.email,
        userName,
        location.latitude,
        location.longitude,
      ])
    }


    // markers 전송
    io.emit('markers', markers)
    // io.emit('currentUser', currentUser.email)
  })

  socket.on('forceDisconnect', function () {
    socket.disconnect()
  })

  socket.on('disconnect', function () {
    console.log('user disconnected: ' + socket.name)
    markers.pop()
  })
})

// 마커를 추가하는 함수
// function addMarker(currentUser, location) {
  // db2.query(
  //   `SELECT name FROM photographer WHERE email=?`,
  //   [currentUser.email],
  //   function (error, name) {
  //     if (error) {
  //       throw error
  //     }
  //     userName = name
  //     console.log(currentUser)
  //   }
  // )
  // 좌표 확인하고 markers 배열에 추가
  // console.log('add: ' + location.latitude + ', ' + location.longitude)
  // markers.push([
  //   // userName,
  //   currentUser.email,
  //   userName,
  //   location.latitude,
  //   location.longitude,
  // ])
  // console.log(userName)
// }

// Set static folder

const botName = 'ChatCord Bot'

// Run when client connects
io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room)

    socket.join(user.room)

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'))

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      )

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
    })
  })

  // Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id)

    io.to(user.room).emit('message', formatMessage(user.username, msg))
    // var now = new Date();
    for (var i = 0; i < 1; i++) {
      db2.query(
        //customer 테이블의 해당 user 의id값과 같으면, 컬럼 chatroom0부터 남은 chatroom 에 넣어주기
        'WHILE(chatroom' +
          i +
          '==NULL) SET INSERT INTO customer (chatroom' +
          i +
          ') VALUES (?) WHERE id=3 AND NOT EXISTS chatroom' +
          i +
          '',
        [user.room],
        function () {
          //console.log('Data Insert OK');
        }
      )
    }
    console.log(moment().format('h:mm a'))
    db2.query(
      'INSERT INTO chatMessage (room, uid, msg, time) VALUES (?, ?, ?, ?)',
      [user.room, user.username, msg, moment().format('h:mm a')],
      function () {
        //console.log('Data Insert OK');
      }
    )
    var roomlong = user.room.length;
    var usernamelong = user.username.length;
    var pnamelong = roomlong - usernamelong;
    var pname = user.room.substring(0,pnamelong);
    var Cname; //고객이름
    var Pname; //작가이름
    //panme => 작가 이메일, user.username => 고객 이메일
    console.log(roomlong);
    console.log(usernamelong);
    console.log(pnamelong);
    console.log(pname); //작가 email

    db2.query(
      'INSERT INTO chatroom (room,uid,pid) VALUES (?, ?, ?)',
      [user.room, user.username, pname],
      function () {
        //console.log('Data Insert OK');
      }
    )

    db2.query('select * from customer where email=?',[user.username], function(err,customerC){
      if(err) return done(err);
      else{
        Cname = customerC[0].name;//고객이름
        console.log(Cname);
        db2.query(
          'UPDATE chatroom SET uname=? WHERE uid=?',
          [Cname,user.username],
          function (error, result) {
            
          }
        )
      }
    })

    db2.query('select * from customer where email=?',[pname], function(err,customerP){
      if(err) return done(err);
      else{
        Pname = customerP[0].name;//작가이름
        console.log(Pname);
        db2.query(
          'UPDATE chatroom SET pname=? WHERE pid=?',
          [Pname,pname],
          function (error, result) {
            response.end()
          }
        )
      }
    })



  })

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id)

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      )

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      })
    }
  })
})

////////////


// Set static folder
app.use(express.static(path.join(__dirname, 'pages')))


const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
AWS.config.loadFromPath(__dirname + '/config/awsconfig.json') //sdk 환경설정 파일경로

app.use(express.static('./public'))

app.get('/upload', (req, res) => res.render('upload'))
var s3 = new AWS.S3()
//파일이 저장될 upload 객체
//속성들 key 값 size,bucket,acl....
let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'photoobucket',
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname)
      cb(null, Date.now().toString() + extension)
    },
    acl: 'public-read-write',
  }),
})

//파일을 업로드 해주고
// app.post('/upload_process', upload.single("imgFile"), function(req, res, next){
//     // let imgFile = req.file;
//     // res.json(imgFile);//업로드한 객체 전달
//     var form = new formidable.IncomingForm();//s3에서 전달해줌
//     form.parse(req,function(err, fields, file){

//       var params = {
//         Bucket:'photoobucket',
//         Key:file.imgFile.name,
//         ACL:'public-read',
//         Body: require('fs').createReadStream(file.imgFile.path)
//       }
//       var s3 = new AWS.S3();
//       s3.upload(params, function(err,data){
//         var result='';
//         if(err)
//             result = 'Fail';
//         else
//             result = `<img src="${data.Location}">`;
//         res.send(`<html><body>${result}</body></html>`);
//       });

//     });
//     //res.send('업로드 성공!');
//   });

app.get('/first.html', function (request, response) {
  //요청을 받으면
  response.sendFile(path.join(__dirname + '/first.html')) //이렇게 응답해준다
})

app.get('/header.html', function (request, response) {
  //요청을 받으면
  response.sendFile(path.join(__dirname + '/header.html')) //이렇게 응답해준다
})

app.get('/footer.html', function (request, response) {
  //요청을 받으면
  response.sendFile(path.join(__dirname + '/footer.html')) //이렇게 응답해준다
})

app.get('/second.html', function (request, response) {
  response.sendFile(path.join(__dirname + 'pages/second.html'))
})

app.get('/concept.html', function (request, response) {
  response.sendFile(path.join(__dirname + 'pages/concept.html'))
})

app.get('/snap1.html', function (request, response) {
  response.sendFile(path.join(__dirname + 'pages/snap1.html'))
})

app.get('/photograper.html', function (request, response) {
  response.sendFile(path.join(__dirname + 'pages/photograper.html'))
})

app.get('/photographer2.html', function (request, response) {
  response.sendFile(path.join(__dirname + 'pages/photographer2.html'))
})

app.get('/multiplestepform.html', function (request, response) {
  response.sendFile(path.join(__dirname + 'pages/multiplestepform.html'))
})

app.get('/signin.html', function (request, response) {
  response.sendFile(path.join(__dirname + 'pages/signin.html'))
})

app.get('/photolist.html', function (request, response) {
  response.sendFile(path.join(__dirname + 'pages/signin.html'))
})

app.get('/1.html', function (request, response) {
  response.sendFile(path.join(__dirname + 'pages/1.html'))
})

app.get('/policy.html', function (request, response) {
  response.sendFile(path.join(__dirname + 'pages/policy.html'))
})

app.get('/photoregister.html', function (request, response) {
  response.sendFile(path.join(__dirname + 'pages/photoregister.html'))
})

app.get('/index.html', function (request, response) {
  response.sendFile(path.join(__dirname + 'views/index.html'))
})

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/intro.html'))
})

app.get('/pay', function (request, response) {
  response.sendFile(path.join(__dirname + 'pages/pay.html'))
})

app.get('/googlemap', function (request, response) {
  currentUser = request.user
  response.sendFile(path.join(__dirname + '/pages/googlemap.html'))
})

app.get('/event-calendar.html', function (request, response) {
  //요청을 받으면
  response.sendFile(path.join(__dirname + 'pages/event-calendar.html')) //이렇게 응답해준다
})

var port = process.env.PORT || 8088 // 1
// const server = app.listen(port, function(){
//  console.log('server on! http://localhost:'+port);
// });
server.listen(port, () => console.log(`Server running on port ${port}`))
