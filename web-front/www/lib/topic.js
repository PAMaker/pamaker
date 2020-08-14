var db2 = require('./db2');
var template2 = require('./template2.js');

exports.home = function(request,response){

    db2.query(`SELECT * FROM topic`,function(error,topics){         
        var title = '지금 바로 후기를 남겨보세요!';
        var description = '';
        var list = template2.list(topics);//회원정보 리스트로 나열
        var html = template2.HTML(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/fav/create">쓰기</a>`
          );
    
        
          //response.writeHead(200);
          response.send(html);
      });

}
