var db2 = require('./db2');
var template2 = require('./template2.js');

exports.home = function(request,response){
    var email = request.user.email;
    db2.query(`SELECT * FROM photographer WHERE photographer.email=?`,[email],function(error2,topic){         
        var title = '서비스를 등록해 보세요!';
      
      
        var description = '';
        
        console.log(topic); //해당 이메일을 가진 작가의 서비스 테이블만 나옴
        console.log(topic[0].maindesc);
        console.log(topic[0].sevdesc);
        console.log(topic[0].price);

        var plist = '<ul>';
        var i = 0;
        while(i < topic.length){
          plist = plist + `<li><a href="?id=${topic[i].id}">${topic[i].maindesc}</a></li>`;
          i = i + 1;
        }
        plist = plist+'</ul>';
   
        
        var html = template2.HTML(title,``,plist,
          `<hr><p>${description}</p><br>`,
          `<a class="waves-effect waves-light btn main_btn" href="/ser/create" style="margin-bottom:80px ;">등록하기</a>
          </br></br>
          <div class="title">

    </div>
	<div></div>
	<script class="jsbin" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	<div class="file-upload">
		<button class="file-upload-btn" type="button" onclick="$('.file-upload-input').trigger( 'click' )">Add Image</button>

    <form action="/upload" method="post" enctype="multipart/form-data">
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
		<button class="file-upload-btn" type="submit" onclick="predict();init();">등록하기</button>
        </p>
  </div></form>


       
  
  
     
          `
          )
    
        //   <form action="/upload" method="post" enctype="multipart/form-data">
        //   <input type="file" name="imgFile">
        //   <input type="submit" value="S3에 보내기">
        // </form>
          //response.writeHead(200);
          response.send(html)
       
         })
        
        }

