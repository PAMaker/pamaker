var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

var socket = require('socket.io');
var io = socket(server);

var port = 5000;
var socketList = []; 

//해당 파일 클라이언트에게 띄우기
app.use('/',function(req,resp){
	resp.sendFile(__dirname+'/chat.html');
});

//SEND라는 이벤트가 발생이 되고 어떤 파라미터가 넘어오면,
//console.log 이용해 넘어온 메세지 콘솔화면에 출력
io.on('connection', function(socket) {
    socketList.push(socket); //특정 이벤트가 발생할시 push
    console.log('User Join');
 
    socket.on('SEND', function(msg) {
        console.log(msg);
        socketList.forEach(function(item, i) {
            console.log(item.id);
            if (item != socket) {
                item.emit('SEND', msg);
            }
        });
    });
 
    socket.on('disconnect', function() {
        socketList.splice(socketList.indexOf(socket), 1);
    });
});

server.listen(port,function(){
	console.log('Server On !');
});