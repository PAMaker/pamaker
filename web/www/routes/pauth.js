var express = require('express');
var app = express(); 
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var shortid = require('shortid');
var db2 = require('../lib/db2');
var pauth = require('../lib/pauth');
var qs = require('querystring');
var url = require('url');
var flash    = require('connect-flash');
var session  = require('express-session');


module.exports=function(ppassport){

  router.get('/login', function(request, response){
    var fmsg = request.flash();
    var feedb2ack = '';
    if(fmsg.error){
      feedb2ack = fmsg.error[0];
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
        <li><a class="material-icons" href="/pmypage">keyboard_arrow_left</a></li>
      </ul>
      <ul id="nav-mobile" class="right">
      <li><a href=""><i class="material-icons">search</i></a></li></ul>
    </div>
  </nav>

<div class ="container" style="margin-bottom: 70px;">
    <h3>로그인</h3>

    <form action="/pauth/login_process" method="post">
    <div class="login-form">
        <div class="row">
            <div class="input-field col s12">
            <p><input type="text" name="name" placeholder="name" value=""></p>
             
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
            <p><input type="password" name="email" placeholder="email" value=""></p>
                
                
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
        <li><a class="material-icons" href="fav">favorite_border</a></li>
        <li><a class="material-icons" href="chat/chat.html">chat</a></li>
        <li><a class="material-icons" href="pmypage">account_circle</a></li>
      </ul>
    </div>
    </nav>
  </footer>

 
</body>
</html>`
  
  ;
  response.send(html);
});

//로그인버튼을 눌렀을때 /pauth/login_process로 라우팅되면서
router.post('/login_process',
  ppassport.authenticate('local', {
    successRedirect: '/pmypage',//성공하면 /
    failureRedirect: '/pauth/login',//실패하면 다시로그인페이지로
    failureFlash:true,
    successFlash:true
  }));


router.get('/register', function(request, response){
    var fmsg = request.flash();
    var feedb2ack = '';
    if(fmsg.error){
      feedb2ack = fmsg.error[0];
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
          <li><a class="material-icons" href="/pmypage">keyboard_arrow_left</a></li>
        </ul>
        <ul id="nav-mobile" class="right">
        <li><a href="page/sass.html"><i class="material-icons">search</i></a></li></ul>
      </div>
    </nav>
  
  <div class ="container" style="margin-bottom: 70px;">
      <h3>회원가입</h3>

    <form action="/pauth/register_process" method="post">

    <p><input type="text" name="name" placeholder="name" value=""></p>
    <p><input type="password" name="email1" placeholder="email" value=""></p>
    <p><input type="password" name="email2" placeholder="email" value=""></p>
    <p><input type="text" name="phone" placeholder="phone" value=""></p>
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
  
  ;
  response.send(html);
});




//파라메터값 받아서 heidy sql db에 저장
  router.post('/register_process',function (request, response){
    var post = request.body;
   
    var email1 = post.email1;
    var email2 = post.email2;
   
    if(email1 !== email2){
      request.flash('error', 'Email must same!');
      response.redirect('/pauth/register');
    } else{

  //db에 삽입해주는 쿼리
  db2.query(`INSERT INTO photographer (name,email, phone)
  VALUES(?,?,?)
`,
[post.name, post.email,post.phone], 
function(error, result){
  if(error){
    throw error;
  }

  
}
)

    }

      
        return response.redirect('/pmypage');
     
  });





router.get('/logout',function(request,response){
    request.logout();
    
    request.session.save(function(){
        response.redirect('/pmypage');
    });
});
  return router;
}

//정보변경//작성자만 접근할 수 있도록

router.get('/changemyinfo', function(request, response){
  if (!pauth.isOwner(request, response)) {
    response.redirect('/pmypage');
    return false;
  }
  var fmsg = request.flash();
  var feedb2ack = '';
  if(fmsg.error){
    feedb2ack = fmsg.error[0];
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
  <p><input type="password" name="email1" placeholder="email1" value=""></p>
  <p><input type="password" name="email2" placeholder="email2" value=""></p>
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


</body>
</html>
`

;
response.send(html);
});

//heidysql 에 있는 정보변경
router.post('/changemyinfo_process', function (request, response) {
  var post = request.body;
  var email1 = post.email1;
  var email2 = post.email2;
  if(email1 !== email2){
    request.flash('error', 'Email must same!');
    response.redirect('/pauth/changemyinfo');
  } else{

//db에 변경해주는 쿼리
var sql = 'UPDATE photographer SET name=?,email=?,phone=? WHERE id = '+db2.escape(post.name);

db2.query(sql,[post.name,post.email,post.phone],function(err,rows){
  if(err) console.log("err : "+err);
  console.log(rows);
  return response.redirect('/pmypage');
});
  
}


  });





