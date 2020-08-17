module.exports = {
    HTML:function(authStatusUI){
      return `
        <!DOCTYPE html>
        <html>
        <head>
        <title></title>
        <meta charset = "utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=no", initial-scale="1.0">
        <link rel="stylesheet" type="text/css" href="reset.css">
        <link rel="stylesheet" type="text/css" href="first.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      
   
         <link rel="stylesheet" href="gallery.css">
         <link rel="stylesheet" href="calendar.css">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
      
       
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
      
    
      </style>
</head>
<body>
<header>
  <nav>
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo center"><i class="material-icons">linked_camera</i>22세기사진관</a>
      <ul id="nav-mobile" class="left">
        <li><a class="material-icons" href="pmypage">keyboard_arrow_left</a></li>
      </ul>
      <ul id="nav-mobile" class="right">
      <li><a href="sass.html"><i class="material-icons">search</i></a></li></ul>
    </div>
  </nav>
</header>
<div class="col s12 l6 offset-l1 center-align">
<h4 style="margin-top: 70px; color: grey;">반갑습니다 작가님!</h4>

<!-- button -->
<h6></h6>
  <h5>${authStatusUI}</h5>

<div class="container" style="margin-top: 30px;">
    <a class="waves-effect waves-light btn-large" style="color: papayawhip" href="photographer2.html" style="margin-right: 20px;" ><i class="material-icons right">account_circle</i>서비스등록</a>
    <a class="waves-effect waves-light btn-large" style="color: papayawhip" href="#calendar" style="margin-right: 20px;"><i class="material-icons right">event</i>일정관리</a>
    <a class="waves-effect waves-light btn-large" style="color: papayawhip" href="#gallery"><i class="material-icons right">content_paste</i>포트폴리오</a>
</div>
</div>
</header>





  <footer class="page-footer">
  <nav>
    <div class="nav-wrapper">
      <ul id="nav-mobile" class="center">
        <li><a class="material-icons" href="first.html">home</a></li>
        <li><a class="material-icons" href="fav">favorite_border</a></li>
        <li><a class="material-icons" href="chat/chat.html">chat</a></li>
      </ul>
        <ul id="nav-mobile" class="right">
           <li><a class="material-icons" href="pmypage">account_circle</a></li>
        </ul>
      </ul>
    </div>
    </nav>
  </footer>


</body>
</html>
      `;
    }
  }