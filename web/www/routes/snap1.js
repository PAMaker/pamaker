var http = require('http');
var url = require('url');
var querystring = require('querystring');
var qs = require('querystring');
var template3 = require('../lib/template3.js');
var photographerlist = require('../lib/photographerlist');
var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');
var db2 = require('../lib/db2');//heidy db



   
//각각의 리스트를 눌렀을때
//localhost:8080/snap1
router.get('/',function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
 
  //var id = parseUrl.substring(parseUrl.lastIndexOf("=")+1);
  //console.log(id);
  if(pathname === '/'){
    if(queryData.id === undefined){
        photographerlist.home(request,response);
    }else{
        db2.query(`SELECT * FROM customer`, function(error,topics){
            //console.log(topics);
            //console.log(topic);
            if(error){
              throw error;
            }
            db2.query(`SELECT * FROM customer WHERE email=?`,[queryData.id],function(error2,topic){
              if(error2){
                throw error2;
              }
         console.log(topic); 
        var mainphoto = topic[0].mainphoto;
        var maindesc = topic[0].maindesc;
        var sevdesc = topic[0].sevdesc;
        var price = topic[0].price;
        
        
        //var customer = request.user.email;
        var customer = request.user.email;
        var photographer = queryData.id;
        console.log(queryData.id);
        
        //photographer+customer => customer db chatroom 에 순차대로 저장

          var list = template3.list(topic);
          var control = template3.control(mainphoto,maindesc,sevdesc,price,photographer,customer); // 사용자의 id db에서 가져오기
          var html = template3.HTML('','',control);
          
            response.send(html);
          });
          
          });


    }
  }

});






module.exports = router;








