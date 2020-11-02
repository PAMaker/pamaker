var db2 = require('./db2');
var template2 = require('./template2.js');



exports.home = function(request,response){



    db2.query(`SELECT * FROM chatroom WHERE uid=?`,[request.user.email],function(error2,customer){
        
        console.log(customer);
        var room = customer[0].room;
        if(room == undefined){
            var html = `hi`;
            response.send(html);
        }
        var uid = customer[0].uid;
        console.log('room:',room); //egoing777@gmail.comdpdls0603@naver.com
        console.log('uid:',uid);

        var photographername = customer[0].pname;
        console.log(photographername);
        var title = '대화 방을 골라보세요!';
        var description = '';
        var list1 = template2.list1(customer);//회원정보 리스트로 나열
        var html = template2.HTML(title,``, list1,
          ``,
          ``
          );
    
        
          //response.writeHead(200);
          response.send(html);
      });

      





}
