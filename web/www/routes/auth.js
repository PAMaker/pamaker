var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var fs = require('fs')
var sanitizeHtml = require('sanitize-html')
var shortid = require('shortid')
var db2 = require('../lib/db2')
var auth = require('../lib/auth')
var qs = require('querystring')
var url = require('url')
var flash = require('connect-flash')
var session = require('express-session')

//http://localhost:8080/auth/login
module.exports = function (passport) {
  router.get('/login', function (request, response) {
    // var fmsg = request.flash()
    // var feedb2ack = ''
    // if (fmsg.error) {
    //   feedb2ack = fmsg.error[0]
    // }
    var title = '로그인'
    var html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title></title>
      <meta charset = "utf-8">
      <link rel="stylesheet" href="/first.css" />
      <link rel="stylesheet" type="text/css" href="/nav.css">
    
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    
    
    
    
        
    <style>
    @import url("http://fonts.googleapis.com/earlyaccess/nanumgothic.css");
      
    html {
      height: 100%;
    }
    
    body {
        width:100%;
        height:100%;
        margin: 0;
        font-family: "Nanum Gothic", arial, helvetica, sans-serif;
        background-repeat: no-repeat;
    }
    
      .card {
          margin: 0 auto; /* Added */
          float: none; /* Added */
          margin-bottom: 10px; /* Added */
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    
    .form-signin .form-control {
        position: relative;
        height: auto;
        -webkit-box-sizing: border-box;
         -moz-box-sizing: border-box;
             box-sizing: border-box;
        padding: 10px;
        font-size: 16px;
    }
    </style>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    </head>
    <body>
    
    <header>
    <nav>
        <a href="" class="brand-logo black-text"><img src="logo_background.png" style="width: 80px" alt="" /></a>
    </nav>
    </header>

<div class ="container" style="margin-bottom: 70px;" align="center">
<h2 class="card-title text-center" style="color:#113366;">로그인</h2>
  <div class="card align-middle" style="width:400px; border-radius:20px;">
    <div class="card-body">
      <form action="/auth/login_process" class="form-signin" method="post" onSubmit="logincall();return false">
        <h6 class="form-signin-heading">로그인 정보를 입력하세요</h6>
        <input type="text" name="email" id="uid" class="form-control" placeholder="ID" required autofocus><BR>
        <input type="password" name="password" id="upw" class="form-control" placeholder="Password" required><br>
        <button id="btn-Yes" class="btn btn-lg btn-primary btn-block" type="submit" value="LOGIN">로 그 인</button>
      </form>
      <br><p>회원이 아니신가요? <a href ='/auth/register'>회원가입하기</a></p>
    </div>
  </div>
</div>

<div class="modal"></div>



<nav>
  <div class="nav-wrapper">
      <ul id="nav-mobile" class="center">
        <li><a class="material-icons" href="first.html"></a></li>
        <li><a class="material-icons" href="first.html"></a></li>
        <li><a class="material-icons" href="first.html"></a></li>
        <li><a class="material-icons" href="first.html">home</a></li>
        <li><a class="material-icons" href="fav">favorite_border</a></li>
        <li><a class="material-icons" href="chat">chat</a></li>
        <li><a class="material-icons" href="mypage">account_circle</a></li>
        <li><a class="material-icons" href="first.html"></a></li>
        <li><a class="material-icons" href="first.html"></a></li>
      </ul>
    </div>
  </nav>
  
    

  
</body>
</html>`

response.send(html)
  })

  //로그인버튼을 눌렀을때 /auth/login_process로 라우팅되면서
  router.post(
    '/login_process',
    passport.authenticate('local', {
      successRedirect: '/mypage', //성공하면 /
      failureRedirect: '/auth/login', //실패하면 다시로그인페이지로
      failureFlash: true,
      successFlash: true,
    })
  )

  router.get('/register', function (request, response) {
    var fmsg = request.flash()
    var feedb2ack = ''
    if (fmsg.error) {
      feedb2ack = fmsg.error[0]
    }
    var title = '회원가입'

    var html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title></title>
      <meta charset = "utf-8">
      <link rel="stylesheet" href="/first.css" />
      <link rel="stylesheet" type="text/css" href="/nav.css">
    
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    
  <style>
  @import url("http://fonts.googleapis.com/earlyaccess/nanumgothic.css");
    
          html {
            height: 100%;
          }
    
          body {
            width: 100%;
            height: 100%;
            margin: 0;
            font-family: "Nanum Gothic", arial, helvetica, sans-serif;
            background-repeat: no-repeat;
          }
    
          .card {
            margin: 0 auto; /* Added */
            float: none; /* Added */
            margin-bottom: 10px; /* Added */
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
          }
    
          .form-signin .form-control {
            position: relative;
            height: auto;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 10px;
            font-size: 16px;
          }
  </style>
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  </head>
  <body>
  
  <header>
  <nav>
      <a href="" class="brand-logo black-text"><img src="logo_background.png" style="width: 80px" alt="" /></a>
  </nav>
  </header>
    
        <div class="container" style="margin-bottom: 70px" align="center">
          <h2 class="card-title text-center" style="color: #113366">회원가입</h2>
          <div class="card align-middle" style="width: 100%; border-radius: 20px">
            <div class="card-body">
              <form action="/auth/register_process" class="form-signin" method="post" onSubmit="logincall();return false">
                <h6 class="form-signin-heading">회원가입 정보를 입력하세요</h6>
                <p><input type="text" name="name" placeholder="name" value=""></p>
                <p><input type="email" name="email" placeholder="email" value=""></p>
                <p><input type="password" name="pwd" placeholder="password" value=""></p>
                <p><input type="password" name="pwd2" placeholder="password" value=""></p>
                <p>
                  <button id="btn-Yes" class="btn btn-lg btn-primary btn-block" type="submit" value="LOGIN">회원가입하기 </button>
                </p>
              </form>
              <p>이미 회원인가요? <a href ='/auth/login'>로그인하기</a></p>
            </div>
          </div>
        </div>
    
        <div class="modal"></div>
    

        <nav>
        <div class="nav-wrapper">
            <ul id="nav-mobile" class="center">
              <li><a class="material-icons" href="first.html"></a></li>
              <li><a class="material-icons" href="first.html"></a></li>
              <li><a class="material-icons" href="first.html"></a></li>
              <li><a class="material-icons" href="first.html">home</a></li>
              <li><a class="material-icons" href="fav">favorite_border</a></li>
              <li><a class="material-icons" href="chat">chat</a></li>
              <li><a class="material-icons" href="mypage">account_circle</a></li>
              <li><a class="material-icons" href="first.html"></a></li>
              <li><a class="material-icons" href="first.html"></a></li>
            </ul>
          </div>
        </nav>
        <script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
          integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
          integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
          crossorigin="anonymous"
        ></script>
      </body>
    </html>
    
  `

    response.send(html)
  })

  //파라메터값 받아서 heidy sql db에 저장
  router.post('/register_process', function (request, response) {
    var post = request.body
    //var email = post.email;
    var pwd = post.pwd
    var pwd2 = post.pwd2
    //var displayName = post.displayName;
    if (pwd !== pwd2) {
      request.flash('error', 'Password must same!')
      response.redirect('/auth/register')
    } else {
      //db에 삽입해주는 쿼리
      db2.query(
        `INSERT INTO customer (name,email, password)
  VALUES(?,?,?)
`,
        [post.name, post.email, post.pwd],
        function (error, result) {
          if (error) {
            throw error
          }
        }
      )
    }

    return response.redirect('/mypage')
  })

  router.get('/logout', function (request, response) {
    request.logout()

    request.session.save(function () {
      response.redirect('/mypage')
    })
  })
  return router
}

//정보변경//작성자만 접근할 수 있도록

router.get('/changemyinfo', function (request, response) {
  if (!auth.isOwner(request, response)) {
    response.redirect('/mypage')
    return false
  }
  var fmsg = request.flash()
  var feedb2ack = ''
  if (fmsg.error) {
    feedb2ack = fmsg.error[0]
  }

  var title = '정보변경'

  var html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title></title>
    <meta charset = "utf-8">
    <link rel="stylesheet" type="text/css" href="/first.css">
    <link rel="stylesheet" type="text/css" href="/nav.css">
  
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  
<style>
@import url("http://fonts.googleapis.com/earlyaccess/nanumgothic.css");
  
        html {
          height: 100%;
        }
  
        body {
          width: 100%;
          height: 100%;
          margin: 0;
          font-family: "Nanum Gothic", arial, helvetica, sans-serif;
          background-repeat: no-repeat;
        }
  
        .card {
          margin: 0 auto; /* Added */
          float: none; /* Added */
          margin-bottom: 10px; /* Added */
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
  
        .form-signin .form-control {
          position: relative;
          height: auto;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          padding: 10px;
          font-size: 16px;
        }
        
        .btn {
            background-color: rgb(58, 58, 58);
        }

</style>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>
<body>

<header>
<nav>
    <a href="" class="brand-logo black-text"><img src="logo_background.png" style="width: 80px" alt="" /></a>
</nav>
</header>

<div class ="container" style="margin-bottom: 70px;">
    <h3>정보변경</h3>

  <form action="/auth/changemyinfo_process" method="post">
  <p><input type="text" name="name" placeholder="name" value=""></p>
  <p><input type="email" name="email" placeholder="email" value=""></p>
  <p><input type="password" name="pwd" placeholder="pwd" value=""></p>
  <p><input type="password" name="pwd2" placeholder="pwd2" value=""></p>
  <p>
  <input type="submit" class ="waves-effect waves-light btn main_btn" value="변경하기">
  <div class="col"><a href="/mypage" class ="waves-effect waves-light btn main_btn"> ◁&nbsp;&nbsp;뒤로가기</a></div>
  </p>

</form>
</div>
  


<nav>
<div class="nav-wrapper">
    <ul id="nav-mobile" class="center">
      <li><a class="material-icons" href="first.html"></a></li>
      <li><a class="material-icons" href="first.html"></a></li>
      <li><a class="material-icons" href="first.html"></a></li>
      <li><a class="material-icons" href="/first.html">home</a></li>
      <li><a class="material-icons" href="/fav">favorite_border</a></li>
      <li><a class="material-icons" href="/chat">chat</a></li>
      <li><a class="material-icons" href="/mypage">account_circle</a></li>
      <li><a class="material-icons" href="first.html"></a></li>
      <li><a class="material-icons" href="first.html"></a></li>
    </ul>
  </div>
</nav>


</body>
</html>
`

  response.send(html)
})

//heidysql 에 있는 정보변경
router.post('/changemyinfo_process', function (request, response) {
  var post = request.body
  var email = post.email
  var name = post.name
  var pwd = post.pwd
  var pwd2 = post.pwd2
  mail = request.user.email
  //var displayName = post.displayName;
  if (pwd !== pwd2) {
    request.flash('error', 'Password must same!')
    response.redirect('/auth/register')
  } else {
    //db에 삽입해주는 쿼리
    db2.query(
      'UPDATE customer SET name=?, email=?, password=? WHERE email=?',
      [name, email, pwd, request.user.email],
      function (error, result) {
        response.end()
      }
    )
  }

  return response.redirect('/mypage')
})

