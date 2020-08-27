var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var ptemplate2 = require('../lib/ptemplate2.js');
var auth = require('../lib/auth');
var db2 = require('../lib/db2');
var shortid = require('shortid');

router.get('/service', function (request, response) {
//   if (!auth.isOwner(request, response)) {
//     response.redirect('/mypage');
//     return false;
//   }
  var title = '서비스 등록하기';
  //var list = template2.list(request.list);
  var html = ptemplate2.HTML(title, '', `
      <form action="/ser/service_process" method="post">
        <p>
          <textarea name="maindesc" placeholder="작가님한줄"></textarea>
        </p>
        <p>
          <textarea name="sevdesc" placeholder="서비스설명"></textarea>
        </p>
        <p>
          <textarea name="price" placeholder="가격정보"></textarea>
        </p>
        <p>
         
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    `, '');
  response.send(html);
});

router.post('/service_process', function (request, response) {
//   if (!auth.isOwner(request, response)) {
//     response.redirect('/');
//     return false;
//   }
  var post = request.body;
  db2.query(`
  INSERT INTO photographer (maindesc, sevdesc, price) 
    VALUES(?,?,?)`,
  [post.maindesc, post.sevdesc, post.price], 
  function(error, result){
    if(error){
      throw error;
    }
  response.redirect(`/pmypage`);//질문 제출시 어디경로로??
  
});
});
  
  router.post('/delete_process', function (request, response) {
    if (!auth.isOwner(request, response)) {
      response.redirect('/');
      return false;
    }
    var post = request.body;
    var id = post.id;
    var filteredId = path.parse(id).base;
    fs.unlink(`data/${filteredId}`, function (error) {
      response.redirect('/');
    });
  });

module.exports = router;