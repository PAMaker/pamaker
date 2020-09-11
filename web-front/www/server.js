const fs = require('fs') //databasejson 과 접속가능
const express = require('express') //express 모듈 사용하기 위함
//var parseurl = require('parseurl')
const compression = require('compression')
const app = express() //express 모듈 app이라는 변수명으로 사용

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

///세션 인증
var session = require('express-session')
var FileStore = require('session-file-store')(session)
app.use(bodyParser.urlencoded({ extended: false }))

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

//후기작성기능
var favRouter = require('./routes/fav')
app.use('/fav', favRouter)

//문의 기능
var qnaRouter = require('./routes/qna')
app.use('/qna', qnaRouter)

//사진작가리스트 보여주기
// var snapRouter = require('./routes/snap1')
// app.use('/snap1', snapRouter)

//<작가>

var pmyinfoRouter = require('./routes/pmypage')
app.use('/pmypage', pmyinfoRouter)

//서비스 등록 기능
var serviceRouter = require('./routes/ser')
// const { until } = require('async')
app.use('/ser', serviceRouter)

//채팅기능

// const formatMessage = require('./util/messages')
// const {
//   userJoin,
//   getCurrentUser,
//   userLeave,
//   getRoomUsers,
// } = require('./util/users')

// // Set static folder

// const botName = 'ChatCord Bot'

// // Run when client connects
// io.on('connection', (socket) => {
//   socket.on('joinRoom', ({ username, room }) => {
//     const user = userJoin(socket.id, username, room)

//     socket.join(user.room)

//     // Welcome current user
//     socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'))

//     // Broadcast when a user connects
//     socket.broadcast
//       .to(user.room)
//       .emit(
//         'message',
//         formatMessage(botName, `${user.username} has joined the chat`)
//       )

//     // Send users and room info
//     io.to(user.room).emit('roomUsers', {
//       room: user.room,
//       users: getRoomUsers(user.room),
//     })
//   })

//   // Listen for chatMessage
//   socket.on('chatMessage', (msg) => {
//     const user = getCurrentUser(socket.id)

//     io.to(user.room).emit('message', formatMessage(user.username, msg))
//     // var now = new Date();

//     connection.query(
//       'INSERT INTO chat_test (room, uid, msg) VALUES (?, ?, ?)',
//       [user.room, user.username, msg],
//       function () {
//         //console.log('Data Insert OK');
//       }
//     )
//   })

//   // Runs when client disconnects
//   socket.on('disconnect', () => {
//     const user = userLeave(socket.id)

//     if (user) {
//       io.to(user.room).emit(
//         'message',
//         formatMessage(botName, `${user.username} has left the chat`)
//       )

//       // Send users and room info
//       io.to(user.room).emit('roomUsers', {
//         room: user.room,
//         users: getRoomUsers(user.room),
//       })
//     }
//   })
// })

////////////

//기본값
app.use(express.static('css'))
app.use(express.static('js'))
app.use(express.static('img'))
app.use(express.static('Semantic'))
app.use(express.static('pages'))
// Set static folder
app.use(express.static(path.join(__dirname, 'pages')))
//

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})

//Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
}).single('myImage')

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images Only!')
  }
}

// EJS
app.set('view engine', 'ejs')

// Public Folder
app.use(express.static('./public'))

app.get('/index', (req, res) => res.render('index'))

//파일 제출누르면
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('index', {
        msg: err,
      })
    } else {
      if (req.file == undefined) {
        res.render('index', {
          msg: 'Error: No File Selected!',
        })
      } else {
        res.render('index', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`,
        })
      }
    }
  })
})

app.get('/', function (request, response) {
  //요청을 받으면
  response.sendFile(path.join(__dirname + '/first.html')) //이렇게 응답해준다
})

app.get('/first.html', function (request, response) {
  //요청을 받으면
  response.sendFile(path.join(__dirname + '/first.html')) //이렇게 응답해준다
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

var port = process.env.PORT || 8080 // 1
// const server = app.listen(port, function(){
//  console.log('server on! http://localhost:'+port);
// });
server.listen(port, () => console.log(`Server running on port ${port}`))
