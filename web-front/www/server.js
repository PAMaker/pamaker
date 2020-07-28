const express = require('express');

const app = express();
const port = 8080;
const path = require('path');

app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('img'));

app.get('/first.html',function(request,response){ //요청을 받으면
    response.sendFile(path.join(__dirname+'/first.html')); //이렇게 응답해준다
});

app.get('/second.html',function(request,response){
    response.sendFile(path.join(__dirname+'/second.html'));
});


app.get('/concept.html',function(request,response){
    response.sendFile(path.join(__dirname+'/concept.html'));
});

app.get('/snap1.html',function(request,response){
    response.sendFile(path.join(__dirname+'/snap1.html'));
});

app.get('/photograper.html',function(request,response){
    response.sendFile(path.join(__dirname+'/photograper.html'));
});

app.get('/photographer2.html',function(request,response){
    response.sendFile(path.join(__dirname+'/photographer2.html'));
});

app.get('/myinfo.html',function(request,response){
    response.sendFile(path.join(__dirname+'/myinfo.html'));
});

app.get('/favorite.html',function(request,response){
    response.sendFile(path.join(__dirname+'/favorite.html'));
});

app.get('/multiplestepform.html',function(request,response){
    response.sendFile(path.join(__dirname+'/multiplestepform.html'));
});

app.get('/signin.html',function(request,response){
    response.sendFile(path.join(__dirname+'/signin.html'));
});




app.listen(port, function(err){
    console.log('Connected port'+port);
    if(err){
        return console.log('Found err',err);
    }
})