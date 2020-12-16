var http = require('http');

var app = http.createServer(function(request,response){
  var template = `<!DOCTYPE html>
<html>
<head>
  <title></title>
  <meta charset = "utf-8">
  <meta name="viewport" content="width=device-width, user-scalable=no", initial-scale="1.0">
  <link rel="stylesheet" type="text/css" href="css/reset.css">
  <link rel="stylesheet" type="text/css" href="css/first.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

   <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
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

.main_btn{
  display: block !important;
  width:150px;
  height:40px;
  line-height: 40px;
  margin: 0 auto;
  margin-bottom: 20px;
}

</style>


</head>
<body>
  <nav>
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo"><i class="material-icons">linked_camera</i>22세기사진관</a>
      <ul id="nav-mobile" class="left">
        <li><a class="material-icons" href="first.html">keyboard_arrow_left</a></li>
      </ul>
      <ul id="nav-mobile" class="right">
      <li><a href="sass.html"><i class="material-icons">search</i></a></li></ul>
    </div>
  </nav>


<div id="main_wrap">
<a class="waves-effect waves-light btn main_btn"><i class="material-icons left">cloud</i>작가님</a>
<a href="second.html" class="waves-effect waves-light btn main_btn"><i class="material-icons left">cloud</i>고객님</a>
</div>


  <footer class="page-footer">
  <nav>
    <div class="nav-wrapper">
      <ul id="nav-mobile" class="center">
        <li><a class="material-icons" href="first.html">home</a></li>
        <li><a class="material-icons" href="hugi.html">format_align_justify
</a></li>
        <li><a class="material-icons" href="favorite.html">favorite_border</a></li>
        <li><a class="material-icons" href="chat/chat.html">chat</a></li>
      </ul>
        <ul id="nav-mobile" class="right">
           <li><a class="material-icons" href="mypage.html">account_circle</a></li>
        </ul>
      </ul>
    </div>
    </nav></footer>
  
</body>
</html>`;
        response.writeHead(200);
        response.end(template);

});

app.listen(5000);