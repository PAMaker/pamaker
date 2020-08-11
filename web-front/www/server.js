const fs = require('fs') //databasejson 과 접속가능
const express = require('express') //express 모듈 사용하기 위함
var parseurl = require('parseurl')
const compression = require('compression')
const app = express() //express 모듈 app이라는 변수명으로 사용

//const port = 8080;

const path = require('path')
const multer = require('multer')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mysql = require('mysql')
var helmet = require('helmet')
app.use(helmet())
// const data = fs.readFileSync('db.json')
// const conf = JSON.parse(data)
var router = express.Router()
var flash = require('connect-flash')

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

//마이페이지로 만들기
var authRouter = require('./routes/auth')(passport)
app.use('/auth', authRouter)
var myinfoRouter = require('./routes/myinfo')
app.use('/', myinfoRouter)
///////////

// const connection = mysql.createConnection({
//   host: conf.host,
//   user: conf.user,
//   password: conf.password,
//   port: conf.port,
//   database: conf.database,
// })
// connection.connect()

// app.get('/dd', (req, res) => {
//   connection.query('SELECT*FROM CUSTOMER', (err, rows, fields) => {
//     res.send(rows[0].name)
//   })
// })

module.exports = router

//connection.end();

////////////

//기본값
app.use(express.static('css'))
app.use(express.static('js'))
app.use(express.static('img'))
app.use(express.static('Semantic'))
app.use(express.static('pages'))
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

// Init Upload
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

//
//app.get('/',function(request,response){ //요청을 받으면
//    response.sendFile(path.join(__dirname+'/index.html')); //이렇게 응답해준다
//});

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

app.get('/myinfo.html', function (request, response) {
  response.sendFile(path.join(__dirname + 'pages/myinfo.html'))
})

app.get('/favorite.html', function (request, response) {
  response.sendFile(path.join(__dirname + 'pages/favorite.html'))
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

app.get('/login.html', function (request, response) {
  response.sendFile(path.join(__dirname + 'pages/login.html'))
})

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

//app.listen(port, function(err){
//    console.log('Connected port'+port);
//    if(err){
//        return console.log('Found err',err);
//    }
//})

var port = process.env.PORT || 3000 // 1
app.listen(port, function () {
  console.log('server on! http://localhost:' + port)
})
