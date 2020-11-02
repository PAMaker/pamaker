var db2 = require('./db2');
var template3 = require('./template3.js');

exports.home = function(request,response){

    db2.query(`SELECT * FROM customer WHERE kind like 'P%' `,function(error,topics){         
     
        var list = template3.list(topics);//사진작가들 리스트로 나열
        var html = template3.HTML(list,''
          );
    
        
          //response.writeHead(200);
          response.send(html);
      });

}
