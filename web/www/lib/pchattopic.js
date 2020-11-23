var db2 = require('./db2');
var template2 = require('./template2.js');



exports.home = function(request,response){

    console.log("이메일",request.user.email);

    db2.query(`SELECT * FROM chatroom WHERE pid=?`,[request.user.email],function(error2,customer){
        
        console.log(customer);
        var room = customer[0].room;
        if(room == undefined){
            var html = `hi`;
            response.send(html);
        }
        var pid = customer[0].pid;
        console.log('room:',room); //egoing777@gmail.comdpdls0603@naver.com
        console.log('pid:',pid);

        var photographername = room[0].split(0,3);
        console.log(photographername);
        var title = '대화 방을 골라보세요!';
        var description = '';
        var list2 = template2.list2(customer);//회원정보 리스트로 나열
        var html = template2.HTML(title,``, list2,
          ``,
          ``
          );
    
        
          //response.writeHead(200);
          response.send(html);
      });


      





}
