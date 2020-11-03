module.exports = {
    HTML:function(list,chat,control,chatlist){
      return `
      <!DOCTYPE html>
      <html>
      <head>
        <title></title>
        <meta charset = "utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=no", initial-scale="1.0">
        <link rel="stylesheet" type="text/css" href="reset.css">
        <link rel="stylesheet" type="text/css" href="first.css">
        <link rel="stylesheet" type="text/css" href="nav.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <script>
        $(document).ready(function(){
          $('.collapsible').collapsible();
          M.updateTextFields();
  });

    </script>

    <style>
    .box {
  width: 150px;
  height: 150px; 
  border-radius: 70%;
  overflow: hidden;
}
.profile {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


</style>
</head>

<body>
<header>
<nav>
  <div class="nav-wrapper">
    <a href="" class="brand-logo black-text"
      ><img src="logo.png" style="width: 80px" alt="" />22세기 사진관</a
    >
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="sass.html">Sass</a></li>
      <li><a href="badges.html">Components</a></li>
      <li><a href="collapsible.html">JavaScript</a></li>
    </ul>

    <ul id="nav-mobile" class="left">
      <li>
        <a class="material-icons" href="first.html"
          >keyboard_arrow_left</a
        >
      </li>
    </ul>
    <ul id="nav-mobile" class="right">
      <li>
        <a href="page/sass.html"><i class="material-icons">search</i></a>
      </li>
    </ul>
  </div>
</nav>
</header>
  
     
      <div class="container">
        ${list}
        ${control}
        ${chat}
        ${chatlist}
  </div>
      
    <footer class="page-footer" style="background-color:#242424">
    <nav>
      <div class="nav-wrapper">
        <ul id="nav-mobile" class="center">
          <li><a class="material-icons" href="first.html">home</a></li>
          <li><a class="material-icons" href="fav">favorite_border</a></li>
          <li><a class="material-icons" href="chat">chat</a></li>
        </ul>
          <ul id="nav-mobile" class="right">
             <li><a class="material-icons" href="mypage">account_circle</a></li>
          </ul>
        
      </div>
      </nav>
    </footer>
  
  </body>
  </html>
      `;
    },list:function(topics,photo){
      var list = '<ul>';
      var i = 0;
      while(i < topics.length){
        list = list + `
        <div class="col s12 m7">
  	
    <div class="card horizontal">
      <div class="card-image">
        <img src="현근창10.jpg" width="200px" height="200px"> 
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <p><li><a>${topics[i].name}</a></li></p>
        </div>
        <div class="card-action">
          <a href="?id=${topics[i].email}">작가님 프로필</a>
        </div>
      </div>
    </div>
  </div>`;
        i = i + 1;
      }
      list = list+'</ul>';
      return list;
    },chat:function(topics){
      var list = '<ul>';
      var i = 0;
      while(i < topics.length){
        list = list + `
        <div class="card-action">
        <a href="?id=${topics[i].name}">채팅방 입장하기</a>
      </div>`;
        i = i + 1;
      }
      list = list+'</ul>';
      return list;
    },control:function(maindesc,sevdesc,price,photographer,customer){
        var control = `
          <div class="row">
  			<div class="twelve columns">
  				<div><img class="image" src="" width=100px height=100px></div>
          <br><br>
          <a href="/chat?id=${photographer}${customer}&user=${customer}" class="waves-effect waves-light btn main_btn">대화하기</a>
          <a class="waves-effect waves-light btn main_btn" style="color: papayawhip" href="photograper.html#gallery">포트폴리오</a>
          <a class="waves-effect waves-light btn main_btn" style="color: papayawhip" href="/pay.html">결제진행</a>
  				<h2>작가님 한줄</h2>
          <p>${maindesc}</p>
          
</div></div>

  <div class="col s12 l6 offset-l1 center-align">
          
          <!-- button -->
          <div class="container" style="margin-top: 30px;"></div>
              <h4>서비스 설명</h4>
              <h6>${sevdesc}</h6>
              <h4>가격 정보</h4>
              <h6>${price}</h6>
              <h4>서비스 평가</h4>
              <h6></h6>
          </div></div>
      </div>



`;
      
        return control;
      },chatlist:function(chatroom0,chatroom1,chatroom2,chatroom3){
        var control = `
          <div class="row">
  			<div class="twelve columns">
  				
          <a href="?id=${chatroom0}">${chatroom0}</a>
          <a href="?id=${chatroom1}">${chatroom1}</a>
          <a href="?id=${chatroom2}">${chatroom2}</a>
          <a href="?id=${chatroom3}">${chatroom3}</a>
          
</div></div>

  <div class="col s12 l6 offset-l1 center-align">
          
          <!-- button -->
          <div class="container" style="margin-top: 30px;"></div>
              <h4>서비스 설명</h4>
              <h6>${sevdesc}</h6>
              <h4>가격 정보</h4>
              <h6>${price}</h6>
              <h4>서비스 평가</h4>
              <h6></h6>
          </div></div>
      </div>



`;
      
        return control;
      }










  }
  