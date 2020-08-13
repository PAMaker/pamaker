var http = require('http');
var url = require('url');
var qs = require('querystring');
var template2 = require('../lib/template2.js');
var topic = require('../lib/topic');
var express = require('express');
var router = express.Router();

var db2 = require('../lib/db2');//heidy db


//db2.connect(); //밑에서 createServer로 연결을 해준 경우 불필요

// var _url = request.url;
// var queryData = url.parse(_url, true).query;

router.get('/create',function(request,response){
    db2.query(`SELECT * FROM topic`,function(error,topics){         
        var title = '작성하기';
        var list = template2.list(topics);//회원정보 리스트로 나열
        var html = template2.HTML(title, list,
          `<form action="/favorite/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>`,
          ``
          );

        response.writeHead(200);
        response.end(html);
      });

});

router.post('/create_process',function(request,response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
 
      //글작성후 db에 삽입해주는 처리
        db2.query(`INSERT INTO topic (title, description, created, author)
          VALUES(?,?,NOW(),?)
        `,
        [post.title, post.description, 1], 
        function(error, result){
          if(error){
            throw error;
          }

          response.writeHead(302, {Location: `favorite?id=${result.insertId}`});
          response.end();

        }
        )

    });

});

router.get('/update',function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query; 
    db2.query(`SELECT * FROM topic`,function(error,topics){        

        if(error){
          throw error;
        }
        db2.query(`SELECT * FROM topic WHERE id=?`,[queryData.id],function(error2,topic){
        if(error2){
          throw error2;
        }
          var list = template2.list(topics);
          //console.log("topic[0]:"topic[0]);
          console.log(topic);
          var html = template2.HTML(topic[0].title, list,
            `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${topic[0].id}">
              <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
              <p>
                <textarea name="description" placeholder="description">${topic[0].description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
            `<a href="/create">쓰기</a> <a href="/update?id=${topic[0].id}">수정</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });



});

///id 값으로 url 에 나타내줘서 그거보고 db에서 처리할수 있도록 하고있네...
router.post('/update_process',function(request,response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        db2.query('UPDATE topic SET title=?, description=?, author=1 WHERE id=?', [post.title, post.description, post.id], function(error, result){
          response.writeHead(302, {Location: `favorite?id=${post.id}`});
          response.end();
        })

    });


});


router.post('/delete_process',function(request,response){

    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        console.log(post);
        console.log(post.id);
        db2.query('DELETE FROM topic WHERE id=?',[post.id],function(error,result){
          if(error){
            return error;
          }
          response.writeHead(302, {Location: `/favorite`});
          response.end();
        });
        
    });




});

module.exports = router;








