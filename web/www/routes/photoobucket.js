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
		<link rel="stylesheet" href="slider.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <div class="title">

</div>
<div></div>
<script class="jsbin" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<style>
.centered {
	left: 50%;
	margin-left: 420px;
  }

  /* * {
	box-sizing: border-box;
  }
  body {
	font-family: Verdana, sans-serif;
  }
  .mySlides {
	display: none;
  }
  img {
	vertical-align: middle;
  }

  .slideshow-container {
	max-width: 1000px;
	position: relative;
	margin: auto;
  } */

  .banner {
	position: relative;
	width: 540px;
	height: 250px;
	margin: 0 auto;
	padding: 0;
	overflow: hidden;
  }

  /* .banner ul {
	position: absolute;
	margin: 0px;
	padding: 0;
	list-style: none;
  }
  .banner ul li {
	float: left;
	width: 540px;
	height: 250px;
	margin: 0;
	padding: 0;
  }  */

  .card-title {
	margin-top: 20px;
	text-align: center;
  }
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
	background: #000000;
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
	background: #000000;
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
	border: 4px dashed #000000;
	position: relative;
}
.image-dropping,
.image-upload-wrap:hover {
	background-color: #000000;
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
	color: #000000;
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


</style></head>
<body>
<nav>
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo center">
          <img src="logo_white.png" style="width: 80px" alt="" />22세기
          사진관</a
        >

        <ul id="nav-mobile" class="left">
          <li>
            <a class="material-icons" href="first.html">keyboard_arrow_left</a>
          </li>
        </ul>
        <ul id="nav-mobile" class="right">
          <li>
            <a href="page/sass.html"><i class="material-icons">search</i></a>
          </li>
        </ul>
      </div>
	</nav>
	
<div class="file-upload">


<form action="upload_process" method="post" enctype="multipart/form-data">
  <div class="image-upload-wrap">
      <input class="file-upload-input" type='file' name ="imgFile" onchange="readURL(this);" accept="image/*" />
      <div class="drag-text">
          <h3>메인 프로필 업로드</h3>
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

<footer class="page-footer">
      <nav>
        <div class="nav-wrapper">
          <ul id="nav-mobile" class="center">
            <li><a class="material-icons" href="/first.html">home</a></li>

            <li>
              <a class="material-icons" href="/fav">favorite_border</a>
            </li>
          </ul>
        </div>
      </nav>
	</footer>
	
	<script src="slider.js"></script>
	</body></html>
    `;
    res.send(output);
});

router.post('/upload_process', function(req, res){
	console.log(req.user.email)
   var form = new formidable.IncomingForm();
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
		   db2.query('UPDATE photographer SET mainphoto=? WHERE email=?', [data.Location, req.user.email], function(error, result){
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
				</body></html>`);
       });
   });
});
router.use(function(err, req, res, next) {
      console.error(err.stack);
        res.status(500).send('Something broke!');
});


module.exports = router;