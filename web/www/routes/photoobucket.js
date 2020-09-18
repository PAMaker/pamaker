var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';





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
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <div class="title">

</div>
<div></div>
<script class="jsbin" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<style>
.body {
	font-family: sans-serif;
	background-color: #eeeeee;
}
.file-upload {
	background-color: #ffffff;
	width: 600px;
	margin: 0 auto;
	padding: 20px;
}
.file-upload-btn {
	width: 100%;
	margin: 0;
	color: #fff;
	background: #1fb264;
	border: none;
	padding: 10px;
	border-radius: 4px;
	transition:  0.2s ease;
	outline: none;
	text-transform: uppercase;
	font-weight: 700;
}
.change-btn {
	width: 10% !important;
	margin: 0 !important;
	color: rgb(0, 0, 0) !important;
	background: #fff !important;
	border:  !important;
	padding: 10px !important;
	transition:  0.2s ease !important;
	outline:  !important;
	text-transform: uppercase !important;
	font-weight: 700 !important;
	cursor:  !important;
}
.change-btn:hover {
	background: #dde6e1 !important;
	color: #ffffff !important;
	transition: 0.2s ease;
	cursor: pointer;
}
.file-upload-btn:hover {
	background: #1aa059;
	color: #ffffff;
	transition: 0.2s ease;
	cursor: pointer;
}
.file-upload-btn:active {
	border: 0;
	transition: 0.2s ease;
}
.file-upload-content {
	display: none;
	text-align: center;
}
.file-upload-input {
	position: absolute;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	outline: none;
	opacity: 0;
	cursor: pointer;
}
.image-upload-wrap {
	margin-top: 20px;
	border: 4px dashed #1fb264;
	position: relative;
}
.image-dropping,
.image-upload-wrap:hover {
	background-color: #1fb264;
	border: 4px dashed #ffffff;
}
.image-title-wrap {
	padding: 0 15px 15px 15px;
	color: #222;
}
.drag-text {
	text-align: center;
}
.drag-text h3 {
	font-weight: 100;
	text-transform: uppercase;
	color: #15824b;
	padding: 60px 0;
}
.file-upload-image {
	max-height: 200px;
	max-width: 200px;
	margin: auto;
	padding: 20px;
}
.remove-image {
	width: 200px;
	margin: 0;
	color: #fff;
	background: #cd4535;
	border: none;
	padding: 10px;
	border-radius: 4px;
	border-bottom: 4px solid #b02818;
	transition: 0.2s ease;
	outline: none;
	text-transform: uppercase;
	font-weight: 700;
}
.remove-image:hover {
	background: #c13b2a;
	color: #ffffff;
	transition: 0.2s ease;
	cursor: pointer;
}
.remove-image:active {
	border: 0;
	transition: 0.2s ease;
}


</style>
<div class="file-upload">


<form action="upload_process" method="post" enctype="multipart/form-data">
  <div class="image-upload-wrap">
      <input class="file-upload-input" type='file' name ="imgFile" onchange="readURL(this);" accept="image/*" />
      <div class="drag-text">
          <h3>사진 업로드</h3>
      </div>
  </div>
  <div class="file-upload-content">
      <img class="file-upload-image" id="face-image" src="#" alt="your image" />
      <div class="image-title-wrap">
          <button type="button" onclick="removeUpload()" class="remove-image">Remove
              <span class="image-title">Uploaded Image</span>
          </button>
      </div>
  </div>
  <p style="text-align:rights;">
  <button class="file-upload-btn" type="submit">등록하기</button>
  </p>
</div>


</form>
    `;
    res.send(output);
});

router.post('/upload_process', function(req, res){
   var form = new formidable.IncomingForm();
   form.parse(req, function(err, fields, files){
       var s3 = new AWS.S3();
       var params = {
            Bucket:'photoobucket',
            Key:files.imgFile.name,
            ACL:'public-read',
            Body: require('fs').createReadStream(files.imgFile.path)
       }
       s3.upload(params, function(err, data){
            var result='';
            if(err)
                result = 'Fail';
            else
                result = `<img src="${data.Location}">`;
            res.send(`<html><body>${result}</body></html>`);
       });
   });
});
router.use(function(err, req, res, next) {
      console.error(err.stack);
        res.status(500).send('Something broke!');
});


module.exports = router;