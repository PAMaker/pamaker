var http = require('http');
var url = require('url');
var querystring = require('querystring');
var qs = require('querystring');
var template2 = require('../lib/template2.js');
var ptopic = require('../lib/ptopic');
var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');
var db2 = require('../lib/db2');//heidy db
const multer = require("multer");
const path = require("path");

   
//각각의 리스트를 눌렀을때
//localhost:8080/ser
router.get('/',function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
 
  //var id = parseUrl.substring(parseUrl.lastIndexOf("=")+1);
  //console.log(id);
  if(pathname === '/'){
    if(queryData.id === undefined){
      ptopic.home(request,response);
    }else{
      db2.query(`SELECT * FROM photographer`, function(error,ptopics){
        console.log(ptopics);
        //console.log(ptopic);
        if(error){
          throw error;
        }
        db2.query(`SELECT * FROM photographer WHERE id=?`,[queryData.id],function(error2,ptopic){
          if(error2){
            throw error2;
          }
     console.log(ptopic); 
      

      
        response.send(html);
      });
      
      });


    }
  }

});




//localhost:8080/ser/create
router.get('/create',function(request,response){
//   if (!auth.isOwner(request, response)) {
//     response.redirect('/pmypage');
//     return false;
//   }
          
        var title = '작성하기';
        var html = template2.HTML(title, '',
          `      <form action="/ser/create_process" method="post" enctype="multipart/form-data">
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
        
        `,
          ``
          );

        //response.writeHead(200);//서버가 정상 처리하여 응답한 경우
        response.send(html);
    
      
});



router.post('/create_process',function(request,response){
//   if (!auth.isOwner(request, response)) {
//     response.redirect('/');
//     return false;
//   }
  var post = request.body;
  db2.query(`
  INSERT INTO photographer (maindesc,sevdesc,price) 
    VALUES(?,?,?)`,
  [post.maindesc,post.sevdesc,post.price], 
  function(error, result){
    if(error){
      throw error;
    }
  response.redirect(`/ser`);//질문 제출시 어디경로로??
  
});
});

router.get('/update',function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query; 
    console.log(queryData);
    console.log(queryData.id);
    // db2.query(`SELECT * FROM ptopic`,function(error,ptopic){        

    //     if(error){
    //       throw error;
    //     }
        db2.query(`SELECT * FROM photographer WHERE id=?`,[queryData.id],function(error2,ptopic){
        if(error2){
          throw error2;
        }
          var list = template2.list(ptopic);
         
          console.log(ptopic);
          var html = template2.HTML(ptopic[0].title, list,
            `
            <form action="/ser/update_process" method="post">
              <input type="hidden" name="id" value="${ptopic[0].maindesc}">
              <p><input type="text" name="title" placeholder="title" value="${ptopic[0].sevdesc}"></p>
              <p>
                <textarea name="description" placeholder="description">${ptopic[0].price}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
            ``
          );
          //response.writeHead(200);
          response.send(html);
        });
      });

// });

///id 값으로 url 에 나타내줘서 그거보고 db에서 처리할수 있도록 하고있네...
router.post('/update_process',function(request,response){
  var post = request.body;
    //request.on('end', function(){
      
        db2.query('UPDATE photographer SET maindesc=?, sevdesc=?, price=? WHERE id=?', [post.maindesc, post.sevdesc, post.price], function(error, result){
          //response.writeHead(302, {Location: `favorite?id=${post.id}`});
          //response.send();
          response.redirect(`/ser`);//후기 제출시 경로
        })

    //});
    

});





router.post('/delete_process',function(request,response){
  
  var post = request.body;

        db2.query('DELETE FROM ptopic WHERE id=?',[post.id],function(error,result){
          if(error){
            return error;
          }
          response.writeHead(302, {Location: `/fav`});
          response.end();
        });
        
   


});

module.exports = router;








