var http = require('http');
var url = require('url');
var querystring = require('querystring');
var qs = require('querystring');
var template2 = require('../lib/template2.js');
var ptopic = require('../lib/ptopic');
var express = require('express');
var router = express.Router();
var pauth = require('../lib/pauth');
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
    if (!pauth.isOwner(request, response)) {
      response.redirect('/pmypage')
      return false
    }
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
     var maindesc = ptopic[0].maindesc;
     var sevdesc = ptopic[0].sevdesc;
     var price = ptopic[0].topic;

     var html = template2.HTML(
      ``,
      ``,
      `
      <table style="border-top: 1px solid; border-collapse: collapse;">  
      <tr style="border-bottom: solid 1px ;">     
          <th style="border-bottom: solid 1px ;width: 100px">한줄설명</th>     
          <td style="border-bottom: 1px solid;">
              <p>${maindesc}</p>
          </td>   
      </tr>  
      <tr style="border-top: solid 1px ;">     
          <th style="border-bottom: solid 1px ;">가격</th>     
          <td style="border-bottom: 1px solid;">       
              <p>${price}</p>
          </td>   
      </tr> 
      <tr style="border-top: solid 1px; height:300px;">     
          <th style="border-bottom: solid 1px ;">세부설명</th>     
          <td style="border-bottom: 1px solid;">       
              <p>${sevdesc}</p>
          </td>   
      </tr> 
   </table><br>`,
      `<div class="col s6" >
        <div class="row" >
          <div class="col"><a href="/ser" class ="waves-effect waves-light btn main_btn"> ◁&nbsp;&nbsp;목록</a></div>
          <div class="col">
            <a href="/ser/update?id=${queryData.id}" class ="waves-effect waves-light btn main_btn" >수정</a></div>
          <div class="col">
            <form action="/ser/delete_process" method="post">
              <input type="hidden" name="id" value="${queryData.id}">
              <input type="submit" class="waves-effect waves-light btn main_btn" value="삭제">
            </form></div>  
        </div>
      </div>`
    ) 

      
        response.send(html);
      });
      
      });


    }
  }

});




//localhost:8080/ser/create
router.get('/create',function(request,response){
  // if (!auth.isOwner(request, response)) {
  //   response.redirect('/pmypage');
  //   return false;
  // }
          
        var title = '작성하기';
        var html = template2.HTML(title, '',
          ` <form action="/ser/create_process" method="post">
          <p>제목<input type="text" name="maindesc" placeholder="maindesc"></p>
          <p>컨셉(개인,커플,가족,애견 중 택1)<input type="text" name="concept" placeholder="concept"></p>
          <p>가격정보<input type="text" name="price" placeholder="price"></p>
          <p>
            세부 내용(20자 이상)<textarea name="sevdesc" placeholder="sevdesc" style="height: 200px;"></textarea>
          </p>
          <p><input type="submit" class ="waves-effect waves-light btn main_btn" value="등록"></p>
        </form>
        
        `,
          ``
          );

        //response.writeHead(200);//서버가 정상 처리하여 응답한 경우
        response.send(html);
    
      
});



router.post('/create_process',function(request,response){
  // if (!pauth.isOwner(request, response)) {
  //   response.redirect('/');
  //   return false;
  // }
  var post = request.body;
  var email = request.user.email;
  console.log(post.maindesc);
  console.log(email);
  db2.query(`
  INSERT INTO photographer (email,maindesc,sevdesc,price,concept) 
    VALUES(?,?,?,?,?)`,
  [email,post.maindesc,post.sevdesc,post.price,post.concept], 
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
          var html = template2.HTML(`서비스 정보 수정`,``,``,
            `
            <form action="/ser/update_process" method="post">
            <input type="hidden" name="id" value="${ptopic[0].id}">
            <p>제목<input type="text" name="title" placeholder="title" value="${ptopic[0].maindesc}" style="color:gray;"></p>
            <p>가격&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${ptopic[0].price}</b><hr></p>
            <p>세부설명</p>
            <p>
              <textarea name="description" placeholder="description" style="height:200px;">${ptopic[0].sevdesc}</textarea>
            </p><br>

              <input type="submit" class ="waves-effect waves-light btn main_btn" value="수정하기">
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
      
        db2.query('UPDATE photographer SET maindesc=?, sevdesc=?, price=? WHERE id=?', [post.maindesc, post.sevdesc, post.price, post.id], function(error, result){
          //response.writeHead(302, {Location: `favorite?id=${post.id}`});
          //response.send();
          response.redirect(`/ser`);//후기 제출시 경로
        })

    //});
    

});





router.post('/delete_process',function(request,response){
  
  var post = request.body;

        db2.query('DELETE FROM photographer WHERE id=?',[post.id],function(error,result){
          if(error){
            return error;
          }
          response.writeHead(302, {Location: `/ser`});
          response.end();
        });
        
   


});

module.exports = router;








