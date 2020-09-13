var db2 = require('./db2');
var template2 = require('./template2.js');

exports.home = function(request,response){

    db2.query(`SELECT * FROM photographer`,function(error,topics){         
        var title = '서비스를 등록해 보세요!';
        console.log(topics);
        var description = '';
        var list = '';//특정 포토그래퍼의 등록한 서비스 테이블에서 꺼내와 보여주기
        
        var html = template2.HTML(title, list,
          `<h2></h2>${description}`,
          `<a href="/ser/create">쓰기</a>
          <a href="/index">사진업로드</a>
          `
          );
    
        
          //response.writeHead(200);
          response.send(html);
      });

}
