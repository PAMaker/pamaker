var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
var db2 = require('../lib/db2')




router.get('/s3', function(req, res){
    console.log(1);
    res.send('Hello s3');
});

router.get('/upload', function(req, res){
    var output = `
    <!DOCTYPE html>
      <html>
      <head>
        <title></title>
        <meta name="viewport" content="width=device-width, user-scalable=no", initial-scale="1.0">
        
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
		<link rel="stylesheet" type="text/css" href="first.css">
        <link rel="stylesheet" type="text/css" href="nav.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <div class="title">

</div>
<div></div>
<script class="jsbin" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<style>
html,body{
    width:100%;
    height:100%;
  }
  #main_wrap{
    width: 100%;
    height:100%;
    padding-top:200px;
  }

</style>
</head>
<body>



	
<div class="file-upload">


<form action="upload_process" method="post" enctype="multipart/form-data">
  <div class="image-upload-wrap">
      <input class="file-upload-input" type='file' name ="imgFile" multiple="multiple"  onchange="readURL(this);" accept="image/*" />
      <div class="drag-text">
          <h3>포트폴리오 사진 업로드</h3>
      </div>
  </div>
  <div class="file-upload-content">
      
      
  </div>
  <p style="text-align:rights;">
  <button class="file-upload-btn" type="submit">등록하기</button>
  </p>
</div>


</form>

	</body></html>
    `;
    res.send(output);
});

router.post('/upload_process', function(req, res){
	console.log(req.user.email)
   var form = new formidable.IncomingForm();
   form.multiples = true;
   form.parse(req, function(err, fields, files){
       var s3 = new AWS.S3();
       var params = {
            Bucket:'pamaker',
            Key:files.imgFile.name,
            ACL:'public-read',
            Body: require('fs').createReadStream(files.imgFile.path)
       }
       s3.upload(params, function(err, data){
		   //여기서 얻어온 경로 data.Location을 db에 저장하기
		   db2.query('INSERT INTO photographer_photo (email,sevphoto) VALUES(?,?)', [req.user.email,data.Location], function(error, result){
			//response.writeHead(302, {Location: `favorite?id=${post.id}`});
			//response.send();
			
		  })

			
            var result='';
            if(err)
                result = 'Fail';
            else
				result = `<img src="${data.Location}">`;
				console.log(data.Location);
				res.send(`<html><meta charset="utf-8" />
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
			
				<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
				
				</html><body><h2>업로드 완료!</h2>${result}<br><br><br>
				
				<a href="/ser" class="waves-effect waves-light btn">돌아가기</a>
                </body></html>`
                
                );
                
       });
   });
});
router.use(function(err, req, res, next) {
      console.error(err.stack);
        res.status(500).send('Something broke!');
});


module.exports = router;