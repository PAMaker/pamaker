var db2 = require('./db2');
var template2 = require('./template2.js');



exports.home = function(request,response){



    db2.query(`SELECT * FROM photographer WHERE email=?`,[request.user.email],function(error2,customer){
        
        console.log(customer);
        console.log(customer[0].chatroom0);
        var chatroom0 = customer[0].chatroom0;
        console.log(chatroom0); //현근창송예인

     

        var photographername = chatroom0[0].split(0,3);
        console.log(photographername);
        //var chatroom1 = customer[1].chatroom1;
        console.log(request.user.email);//현재 user의 이메일 컬럼찾아 chatroom 띄우기
        var title = '대화 방을 골라보세요!';
        var description = '';
        var list2 = template2.list2(customer[0]);//회원정보 리스트로 나열
        var html = template2.HTML(title,``, list2,
          ``,
          ``
          );
    
        
          //response.writeHead(200);
          response.send(html);
      });






}
