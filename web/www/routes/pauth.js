var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var fs = require('fs')
var sanitizeHtml = require('sanitize-html')
var shortid = require('shortid')
var db2 = require('../lib/db2')
var pauth = require('../lib/pauth')
var qs = require('querystring')
var url = require('url')
var flash = require('connect-flash')
var session = require('express-session')

module.exports = function (ppassport) {
  router.get('/login', function (request, response) {
    // var fmsg = request.flash();
    // var feedb2ack = '';
    // if(fmsg.error){
    //   feedb2ack = fmsg.error[0];
    // }
    var title = '로그인'
    var html = `
  <!DOCTYPE html>
<html>
<head>
  <title></title>
  <meta charset = "utf-8">
  <!-- <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0"> -->
  <link rel="stylesheet" type="text/css" href="reset.css">
  <link rel="stylesheet" type="text/css" href="first.css">
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

  <nav>
    <div class="nav-wrapper">
      
        <a href="#!" class="brand-logo center"><i class="material-icons">linked_camera</i>22세기사진관</a>
      
      <ul id="nav-mobile" class="left">
        <li><a class="material-icons" href="/pmypage">keyboard_arrow_left</a></li>
      </ul>
      <ul id="nav-mobile" class="right">
      <li><a href=""><i class="material-icons">search</i></a></li></ul>
    </div>
  </nav>

<div class ="container" style="margin-bottom: 70px;" align="center">
<h2 class="card-title text-center" style="color:#113366;">로그인</h2>
  <div class="card align-middle" style="width:20rem; border-radius:20px;">
    <div class="card-body">
      <form action="/pauth/login_process" class="form-signin" method="post" onSubmit="logincall();return false">
        <h6 class="form-signin-heading">로그인 정보를 입력하세요</h6>
        <input type="text" name="email" id="uid" class="form-control" placeholder="ID(email)" required autofocus><BR>
        <input type="password" name="password" id="upw" class="form-control" placeholder="Password" required><br>
        <button id="btn-Yes" class="btn btn-lg btn-primary btn-block" type="submit" value="LOGIN">로 그 인</button>
      </form>
    </div>
  </div>
</div>

<div class="modal"></div>

  <footer class ="page-footer">
  <nav>
    <div class="nav-wrapper">
      <ul id="nav-mobile" class="center">
        <li><a class="material-icons" href="first.html">home</a></li>
        <li><a class="material-icons" href="fav">favorite_border</a></li>
        <li><a class="material-icons" href="chat/chat.html">chat</a></li>
        <li><a class="material-icons" href="pmypage">account_circle</a></li>
      </ul>
    </div>
    </nav>
  </footer>
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script> 
</body>
</html>`

    response.send(html)
  })

  //로그인버튼을 눌렀을때 /pauth/login_process로 라우팅되면서
  router.post(
    '/login_process',
    ppassport.authenticate('local', {
      successRedirect: '/pmypage', //성공하면 /
      failureRedirect: '/pauth/login', //실패하면 다시로그인페이지로
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
    <!-- <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0"> -->
    <link rel="stylesheet" type="text/css" href="reset.css" />
        <link rel="stylesheet" type="text/css" href="first.css" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossorigin="anonymous"
        />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        />
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
  
    <nav>
      <div class="nav-wrapper">
        
          <a href="#!" class="brand-logo center"><i class="material-icons">linked_camera</i>22세기사진관</a>
        
        <ul id="nav-mobile" class="left">
          <li><a class="material-icons" href="/pmypage">keyboard_arrow_left</a></li>
        </ul>
        <ul id="nav-mobile" class="right">
        <li><a href="page/sass.html"><i class="material-icons">search</i></a></li></ul>
      </div>
    </nav>
  
  <div class ="container" style="margin-bottom: 70px;">
  <h2 class="card-title text-center" style="color: #113366">회원가입</h2>
  <div class="card align-middle" style="width: 100%; border-radius: 20px">
    <div class="card-body">

    <form action="/pauth/register_process" class="form-signin" method="post" onSubmit="logincall();return false">
    <h6 class="form-signin-heading">회원가입 정보를 입력하세요</h6>
    <p><input type="text" name="name" placeholder="이름" value=""></p>
    <p><input type="text" name="email" placeholder="이메일" value=""></p>
    <p><input type="password" name="pwd" placeholder="비밀번호" value=""></p>
    <p><input type="password" name="pwd2" placeholder="비밀번호 재입력" value=""></p>
    <p><input type="text" name="phonenum" placeholder="전화번호" value=""></p>
    <p><input type="text" name="region" placeholder="지역" value=""></p>
    <p><input type="text" name="possibletime" placeholder="이용가능시간" value=""></p>
    <p><input type="text" name="camera" placeholder="카메라 기종" value=""></p>
    <p><input type="text" name="career" placeholder="경력" value=""></p>
    <p><input type="text" name="service" placeholder="대표서비스" value=""></p>
    <p><input type="text" name="sns" placeholder="SNS link" value=""></p>
    <p>
    <button id="btn-Yes" class="btn btn-lg btn-primary btn-block" type="submit" value="LOGIN">회원가입하기 </button>
    </p>
    </form>
              <p>이미 회원인가요? <a href ='/auth/login'>로그인하기</a></p>
            </div>
          </div>
        </div>

  <footer class ="page-footer">
  <nav>
    <div class="nav-wrapper">
      <ul id="nav-mobile" class="center">
        <li><a class="material-icons" href="first.html">home</a></li>
        <li><a class="material-icons" href="fav">favorite_border</a></li>
        <li><a class="material-icons" href="chat/chat.html">chat</a></li>
        <li><a class="material-icons" href="pmypage">account_circle</a></li>
      </ul>
    </div>
    </nav>
  </footer>

 
</body>
</html>
  `

    response.send(html)
  })

  //파라메터값 받아서 heidy sql db에 저장
  router.post('/register_process', function (request, response) {
    var post = request.body
    var email = post.email
    // var email1 = post.email1
    // var email2 = post.email2
    var pwd = post.pwd
    var pwd2 = post.pwd2

    if (pwd !== pwd2) {
      request.flash('error', 'password must same!')
      response.redirect('/pauth/register')
    } else {
      //db에 삽입해주는 쿼리
      db2.query(

        `INSERT INTO customer (name, email, password, phonenum, region, possibletime, camera, career, service, sns)  VALUES(?,?,?,?,?,?,?,?,?,?)

`,
        [post.name, post.email, post.pwd, post.phonenum, post.region, post.possibletime, post.camera, post.career, post.service, post.sns],
        function (error, result) {
          if (error) {
            throw error
          }
        }
      )
    }

    return response.redirect('/pmypage')
  })

  router.get('/logout', function (request, response) {
    request.logout()

    request.session.save(function () {
      response.redirect('/pmypage')
    })
  })
  return router
}

//정보변경//작성자만 접근할 수 있도록

router.get('/changemyinfo', function (request, response) {
  if (!pauth.isOwner(request, response)) {
    response.redirect('/pmypage')
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
  <!-- <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0"> -->
  <link rel="stylesheet" type="text/css" href="reset.css">
  <link rel="stylesheet" type="text/css" href="first.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

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
      padding-top: 80px;
      padding-bottom: 40px;
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

  <nav>
    <div class="nav-wrapper">
      
        <a href="#!" class="brand-logo center"><i class="material-icons">linked_camera</i>22세기사진관</a>
      
      <ul id="nav-mobile" class="left">
        <li><a class="material-icons" href="/pmypage">keyboard_arrow_left</a></li>
      </ul>
      <ul id="nav-mobile" class="right">
      <li><a href="page/sass.html"><i class="material-icons">search</i></a></li></ul>
    </div>
  </nav>

<div class ="container" style="margin-bottom: 70px;">
    <h3>정보변경</h3>

  <form action="/pauth/changemyinfo_process" method="post">

  <p><input type="text" name="name" placeholder="name" value=""></p>
  <p><input type="email" name="email" placeholder="emai1" value=""></p>
  <p><input type="password" name="pwd" placeholder="password" value=""></p>
  <p><input type="password" name="pw2" placeholder="password" value=""></p>
  <p><input type="text" name="phone" placeholder="phone" value=""></p>
  <p>
    <input type="submit" value="변경">
  </p>

</form>
</div>

<footer class ="page-footer">
<nav>
  <div class="nav-wrapper">
    <ul id="nav-mobile" class="center">
      
    </ul>
  </div>
  </nav>
</footer>
    script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script> 
</body>
</html>
`

  response.send(html)
})

//heidysql 에 있는 정보변경
router.post('/changemyinfo_process', function (request, response) {
  var post = request.body
  // var email1 = post.email1
  // var email2 = post.email2
  var email = post.email
  var pwd = post.pwd
  var pwd2 = post.pwd2

  if (pwd !== pwd2) {
    request.flash('error', 'password must same!')
    response.redirect('/pauth/changemyinfo')
  } else {
    //db에 변경해주는 쿼리
    var sql =
      'UPDATE photographer SET name=?,email=?,pwd=?,phone=? WHERE id = ' +
      db2.escape(post.name)

    db2.query(sql, [post.name, post.email, post.pwd, post.phone], function (
      err,
      rows
    ) {
      if (err) console.log('err : ' + err)
      console.log(rows)
      return response.redirect('/pmypage')
    })
  }
})
