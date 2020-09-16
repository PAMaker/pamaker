var db2 = require('./db2');
var template2 = require('./template2.js');

exports.home = function(request,response){
    var email = request.user.email;
    db2.query(`SELECT * FROM photographer WHERE photographer.email=?`,[email],function(error2,topic){         
        var title = '서비스를 등록해 보세요!';
      
      
        var description = '';
        
        console.log(topic); //해당 이메일을 가진 작가의 서비스 테이블만 나옴
        console.log(topic[0].maindesc);
        console.log(topic[0].sevdesc);
        console.log(topic[0].price);

        var plist = '<ul>';
        var i = 0;
        while(i < topic.length){
          plist = plist + `<li><a href="?id=${topic[i].id}">${topic[i].maindesc}</a></li>`;
          i = i + 1;
        }
        plist = plist+'</ul>';
   
        
        var html = template2.HTML(title,``,plist,
          `<hr><p>${description}</p><br>`,
          `<a class="waves-effect waves-light btn main_btn" href="/ser/create" style="margin-bottom:80px ;">등록하기</a>
          <a class="waves-effect waves-light btn main_btn" href="" style="margin-bottom:80px ;">사진업로드</a>
          `
          )
    
        
          //response.writeHead(200);
          response.send(html)
       
         })
        
        }

