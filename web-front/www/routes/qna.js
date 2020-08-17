var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template2 = require('../lib/template2.js');
var auth = require('../lib/auth');
var db2 = require('../lib/db2');
var shortid = require('shortid');

router.get('/question', function (request, response) {
  if (!auth.isOwner(request, response)) {
    response.redirect('/mypage');
    return false;
  }
  var title = '문의';
  //var list = template2.list(request.list);
  var html = template2.HTML(title, '', `
      <form action="/qna/question_process" method="post">
        <p>
          <textarea name="question" placeholder="question"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    `, '');
  response.send(html);
});

router.post('/question_process', function (request, response) {
  if (!auth.isOwner(request, response)) {
    response.redirect('/');
    return false;
  }
  var post = request.body;
  db2.query(`
  INSERT INTO topic (question) 
    VALUES(?)`,
  [post.question], 
  function(error, result){
    if(error){
      throw error;
    }
  response.redirect(`/mypage`);//질문 제출시 어디경로로??
  
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