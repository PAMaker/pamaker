var express = require('express');
var app = express(); 
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var shortid = require('shortid');
var db = require('../lib/db');
var auth = require('../lib/auth');
var qs = require('querystring');
var url = require('url');
var flash    = require('connect-flash');
var session  = require('express-session');


module.exports=function(passport){

  router.get('/login', function(request, response){
    var fmsg = request.flash();
    var feedback = '';
    if(fmsg.error){
      feedback = fmsg.error[0];
    }
  var title = '로그인';
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

</style>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>
<body>

  <nav>
    <div class="nav-wrapper">
      
        <a href="#!" class="brand-logo center"><i class="material-icons">linked_camera</i>22세기사진관</a>
      
      <ul id="nav-mobile" class="left">
        <li><a class="material-icons" href="/mypage">keyboard_arrow_left</a></li>
      </ul>
      <ul id="nav-mobile" class="right">
      <li><a href="page/sass.html"><i class="material-icons">search</i></a></li></ul>
    </div>
  </nav>

<div class ="container" style="margin-bottom: 70px;">
    <h3>로그인</h3>

    <form action="/auth/login_process" method="post">
    <div class="login-form">
        <div class="row">
            <div class="input-field col s12">
            <p><input type="text" name="email" placeholder="email" value=""></p>
             
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
            <p><input type="password" name="pwd" placeholder="password" value=""></p>
                
                
            </div>
        </div>
        <p>
<input type="submit" value="LOGIN">

</p>
    </div></form>
    

</div>

  <footer class ="page-footer">
  <nav>
    <div class="nav-wrapper">
      <ul id="nav-mobile" class="center">
        <li><a class="material-icons" href="first.html">home</a></li>
        <li><a class="material-icons" href="favorite.html">favorite_border</a></li>
        <li><a class="material-icons" href="chat/chat.html">chat</a></li>
        <li><a class="material-icons" href="mypage">account_circle</a></li>
      </ul>
    </div>
    </nav>
  </footer>

 
</body>
</html>`
  
  ;
  response.send(html);
});

//로그인버튼을 눌렀을때 /auth/login_process로 라우팅되면서
router.post('/login_process',
  passport.authenticate('local', {
    successRedirect: '/mypage',//성공하면 /
    failureRedirect: '/auth/login',//실패하면 다시로그인페이지로
    failureFlash:true,
    successFlash:true
  }));


router.get('/register', function(request, response){
    var fmsg = request.flash();
    var feedback = '';
    if(fmsg.error){
      feedback = fmsg.error[0];
    }
  var title = '로그인';
 
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
  
  </style>
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  </head>
  <body>
  
    <nav>
      <div class="nav-wrapper">
        
          <a href="#!" class="brand-logo center"><i class="material-icons">linked_camera</i>22세기사진관</a>
        
        <ul id="nav-mobile" class="left">
          <li><a class="material-icons" href="first.html">keyboard_arrow_left</a></li>
        </ul>
        <ul id="nav-mobile" class="right">
        <li><a href="page/sass.html"><i class="material-icons">search</i></a></li></ul>
      </div>
    </nav>
  
  <div class ="container" style="margin-bottom: 70px;">
      <h3>회원가입</h3>

    <form action="/auth/register_process" method="post">

    <p><input type="text" name="email" placeholder="email" value="email"></p>
    <p><input type="password" name="pwd" placeholder="password" value="password"></p>
    <p><input type="password" name="pwd2" placeholder="password" value="password"></p>
    <p><input type="text" name="displayName" placeholder="display name" value="name"></p>
    <p>
      <input type="submit" value="register">
    </p>

  </form>
  </div>
    


  <footer class ="page-footer">
  <nav>
    <div class="nav-wrapper">
      <ul id="nav-mobile" class="center">
        <li><a class="material-icons" href="first.html">home</a></li>
        <li><a class="material-icons" href="favorite.html">favorite_border</a></li>
        <li><a class="material-icons" href="chat/chat.html">chat</a></li>
        <li><a class="material-icons" href="mypage">account_circle</a></li>
      </ul>
    </div>
    </nav>
  </footer>

 
</body>
</html>
  `
  
  ;
  response.send(html);
});


  router.post('/register_process', function (request, response) {
    var post = request.body;
    var email = post.email;
    var pwd = post.pwd;
    var pwd2 = post.pwd2;
    var displayName = post.displayName;
    if(pwd !== pwd2){
      request.flash('error', 'Password must same!');
      response.redirect('/auth/register');
    } else {
      var user = {
        id:shortid.generate(),
        email:email,
        password:pwd,
        displayName:displayName
      };
      
      db.get('users').push(user).write();
      request.login(user, function(err){
        console.log('redirect');
        return response.redirect('/mypage');
      })
    
    }
  });





router.get('/logout',function(request,response){
    request.logout();
    
    request.session.save(function(){
        response.redirect('/mypage');
    });
});
  return router;
}

//정보변경//작성자만 접근할 수 있도록

router.get('/changemyinfo', function(request, response){
  if (!auth.isOwner(request, response)) {
    response.redirect('/mypage');
    return false;
  }
  var fmsg = request.flash();
  var feedback = '';
  if(fmsg.error){
    feedback = fmsg.error[0];
  }
var title = '정보변경';

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

</style>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>
<body>

  <nav>
    <div class="nav-wrapper">
      
        <a href="#!" class="brand-logo center"><i class="material-icons">linked_camera</i>22세기사진관</a>
      
      <ul id="nav-mobile" class="left">
        <li><a class="material-icons" href="first.html">keyboard_arrow_left</a></li>
      </ul>
      <ul id="nav-mobile" class="right">
      <li><a href="page/sass.html"><i class="material-icons">search</i></a></li></ul>
    </div>
  </nav>

<div class ="container" style="margin-bottom: 70px;">
    <h3>정보변경</h3>

  <form action="/auth/changemyinfo_process" method="post">

  <p><input type="text" name="email" placeholder="email" value=""></p>
  <p><input type="password" name="pwd" placeholder="password" value=""></p>
  <p><input type="password" name="pwd2" placeholder="password" value=""></p>
  <p><input type="text" name="nickname" placeholder="display name" value=""></p>
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


</body>
</html>
`

;
response.send(html);
});

//lowdb 에 있는 정보 변경
router.post('/changemyinfo_process', function (request, response) {
  var post = request.body;
  var email = post.email;
  var pwd = post.pwd;
  var pwd2 = post.pwd2;
  var displayName = post.displayName;
  if(pwd !== pwd2){
    request.flash('error', 'Password must same!');
    response.redirect('/auth/changemyinfo');
  } else {
    var user = {
      id:shortid.generate(),
      email:email,
      password:pwd,
      displayName:displayName
    };
    
    db.get('users').push(user).write();
    request.login(user, function(err){
      console.log('redirect');
      return response.redirect('/mypage');
    })
  
  }
});

//문의 // heidysql 정보 문의

  






//return response.redirect('/mypage');


