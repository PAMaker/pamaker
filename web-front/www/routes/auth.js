var express = require('express');
//var app = express(); 
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var shortid = require('shortid');
var db = require('../lib/db');




module.exports=function(passport){

  router.get('/login', function(request, response){
    var fmsg = request.flash();
    var feedback = '';
    if(fmsg.error){
      feedback = fmsg.error[0];
    }
  var title = '로그인';
 
  var html = `
  <html>
  <head>
    <title></title>
    <meta charset="utf-8">
  </head>
  <body>
    <a href="/auth/login">로그인하시오</a>
    <div style="color:red;">${feedback}</div>
    <form action="/auth/login_process" method="post">
    <p><input type="text" name="email" placeholder="email" value="egoing7777@gmail.com"></p>
    <p><input type="password" name="pwd" placeholder="password" value="111111"></p>
      <p>
        <input type="submit" value="login">
      </p>
    </form>
    </body>
    </html>
  `
  
  ;
  response.send(html);
});

//로그인버튼을 눌렀을때 /auth/login_process로 라우팅되면서
router.post('/login_process',
  passport.authenticate('local', {
    successRedirect: '/',//성공하면 /
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
  <html>
  <head>
    <title></title>
    <meta charset="utf-8">
  </head>
  <body>
    <a href="/auth/login">로그인하시오</a>
    <div style="color:red;">${feedback}</div>
    <form action="/auth/register_process" method="post">
    <p><input type="text" name="email" placeholder="email" value="egoing7777@gmail.com"></p>
    <p><input type="password" name="pwd" placeholder="password" value="111111"></p>
    <p><input type="password" name="pwd2" placeholder="password" value="111111"></p>
    <p><input type="text" name="displayName" placeholder="display name" value="egoing"></p>
    <p>
      <input type="submit" value="register">
    </p>
  </form>
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
        return response.redirect('/');
      })
    
    }
  });





router.get('/logout',function(request,response){
    request.logout();
    
    request.session.save(function(){
        response.redirect('/');
    });
});
  return router;
}

