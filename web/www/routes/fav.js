var http = require('http')
var url = require('url')
var querystring = require('querystring')
var qs = require('querystring')
var template2 = require('../lib/template2.js')
var topic = require('../lib/topic')
var express = require('express')
var router = express.Router()
var auth = require('../lib/auth')
var db2 = require('../lib/db2') //heidy db

//각각의 리스트를 눌렀을때
//localhost:8080/fav
router.get('/', function (request, response) {
  var _url = request.url
  var queryData = url.parse(_url, true).query
  var pathname = url.parse(_url, true).pathname

  //var id = parseUrl.substring(parseUrl.lastIndexOf("=")+1);
  //console.log(id);

  if (pathname === '/') {
    if (queryData.id === undefined) {
      topic.home(request, response)
    } else {
      db2.query(`SELECT * FROM topic`, function (error, topics) {
        console.log(topics)

        //console.log(topic);
        if (error) {
          throw error
        }
        db2.query(
          `SELECT * FROM topic LEFT JOIN customer ON topic.id=customer.id WHERE topic.id=?`,
          [queryData.id],
          function (error2, topic) {
            if (error2) {
              throw error2
            }
            console.log(topic)
            var title = topic[0].title //topic 테이블에서 가져옴
            var description = topic[0].description //topic 테이블에서 가져옴
            var list = template2.list(topic)
            var html = template2.HTML(
              `후기`,
              ``,
              `
              <table style="border-top: 1px solid; border-collapse: collapse;">  
              <tr style="border-bottom: solid 1px ;">     
                  <th style="border-bottom: solid 1px ;width: 100px">제목</th>     
                  <td style="border-bottom: 1px solid;">
                      <p>${title}</p>
                  </td>   
              </tr>  
              <tr style="border-top: solid 1px ;">     
                  <th style="border-bottom: solid 1px ;">이름</th>     
                  <td style="border-bottom: 1px solid;">       
                      <p>${topic[0].name}</p>
                  </td>   
              </tr> 
              <tr style="border-top: solid 1px; height:300px;">     
                  <th style="border-bottom: solid 1px ;">내용</th>     
                  <td style="border-bottom: 1px solid;">       
                      <p>${description}</p>
                  </td>   
              </tr> 
           </table><br>`,
              `<div class="col s6" >
                <div class="row" >
                  <div class="col"><a href="/fav" class ="waves-effect waves-light btn main_btn"> ◁&nbsp;&nbsp;목록</a></div>
                  <div class="col">
                    <a href="/fav/update?id=${queryData.id}" class ="waves-effect waves-light btn main_btn" >수정</a></div>
                  <div class="col">
                    <form action="/fav/delete_process" method="post">
                      <input type="hidden" name="id" value="${queryData.id}">
                      <input type="submit" class="waves-effect waves-light btn main_btn" value="삭제">
                    </form></div>  
                </div>
              </div>`
            )
            response.send(html)
          }

        )
      })
    }
  }
})

//localhost:8080/fav/create

router.get('/create', function (request, response) {
  // if (!auth.isOwner(request, response)) {
  //   response.redirect('/fav/create')
  //   return false
  // }

  var title = '작성하기'
  var html = template2.HTML(
    title,
    ``,
    `<form action="/fav/create_process" method="post">
      <p>제목<input type="text" name="title" placeholder="title"></p>
      <p>작성자<input type="text" name="author" placeholder="name"></p>
      <p>
        후기 내용(20자 이상)<textarea name="description" placeholder="description" style="height: 200px;"></textarea>
      </p>
      <p><input type="submit" class ="waves-effect waves-light btn main_btn" value="후기 제출"></p>
    </form>`,
    ``
  )

  //response.writeHead(200);//서버가 정상 처리하여 응답한 경우
  response.send(html)
})
router.post('/create_process', function (request, response) {
  // if (!auth.isOwner(request, response)) {
  //   response.redirect('/')
  //   return false
  // }
  var post = request.body
  db2.query(
    `
  INSERT INTO topic (title,author,description,created) 

    VALUES(?,?,?,NOW())`,
    [post.title, post.author, post.description],
    function (error, result) {
      if (error) {
        throw error
      }
      response.redirect(`/fav`) //질문 제출시 어디경로로??
    }
  )
})

router.get('/update', function (request, response) {
  var _url = request.url
  var queryData = url.parse(_url, true).query
  console.log(queryData)
  console.log(queryData.id)
  // db2.query(`SELECT * FROM topic`,function(error,topic){

  //     if(error){
  //       throw error;
  //     }
  db2.query(`SELECT * FROM topic WHERE id=?`, [queryData.id], function (
    error2,
    topic
  ) {
    if (error2) {
      throw error2
    }
    var list = template2.list(topic)

    console.log(topic)
    var html = template2.HTML(
      `후기 수정하기`,
      ``,``,
      `
            <form action="/fav/update_process" method="post">
              <input type="hidden" name="id" value="${topic[0].id}">
              <p>제목<input type="text" name="title" placeholder="title" value="${topic[0].title}" style="color:gray;"></p>
              <p>작성자&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${topic[0].author}</b><hr></p>
              <p>후기 내용</p>
              <p>
                <textarea name="description" placeholder="description" style="height:200px;">${topic[0].description}</textarea>
              </p><br>

                <input type="submit" class ="waves-effect waves-light btn main_btn" value="수정하기">
              </p>
            </form>
            `,
      ``
    )
    //response.writeHead(200);
    response.send(html)
  })
})

// });

///id 값으로 url 에 나타내줘서 그거보고 db에서 처리할수 있도록 하고있네...
router.post('/update_process', function (request, response) {
  var post = request.body
  //request.on('end', function(){

  db2.query(
    'UPDATE topic SET title=?, description=?, author=1 WHERE id=?',
    [post.title, post.description, post.id],
    function (error, result) {
      //response.writeHead(302, {Location: `favorite?id=${post.id}`});
      //response.send();
      response.redirect(`/fav`) //후기 제출시 경로
    }
  )

  //});
})

router.post('/delete_process', function (request, response) {
  var post = request.body

  db2.query('DELETE FROM topic WHERE id=?', [post.id], function (
    error,
    result
  ) {
    if (error) {
      return error
    }
    response.writeHead(302, { Location: `/fav` })
    response.end()
  })
})

module.exports = router
