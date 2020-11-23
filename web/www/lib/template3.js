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
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    
 
       <link rel="stylesheet" href="gallery.css">
       <link rel="stylesheet" href="calendar.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    
        <link rel="stylesheet" type="text/css" href="first.css">
        <link rel="stylesheet" type="text/css" href="nav.css">
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
  <a href="" class="brand-logo black-text"><img src="logo_background.png" style="width: 80px" alt="" /></a>
</nav>
</header>
  
     
      <div class="container">
      <br><br><br>
      <h5>촬영 가능한 스케줄 목록</h5>
      <hr style="width:100%; margin-bottom:50px; margin-top:20px;">
        ${list}
        ${control}
        ${chat}
        ${chatlist}
  </div>
      
    <footer class="page-footer" style="background-color:#242424;">
    <nav>
  <div class="nav-wrapper">
      <ul id="nav-mobile" class="center">
        <li><a class="material-icons" href="first.html"></a></li>
        <li><a class="material-icons" href="first.html"></a></li>
        <li><a class="material-icons" href="first.html"></a></li>
        <li><a class="material-icons" href="first.html">home</a></li>
        <li><a class="material-icons" href="fav">favorite_border</a></li>
        <li><a class="material-icons" href="chat">chat</a></li>
        <li><a class="material-icons" href="mypage">account_circle</a></li>
        <li><a class="material-icons" href="first.html"></a></li>
        <li><a class="material-icons" href="first.html"></a></li>
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
    <div class="row" style="float:left">
      <div class="col s12 m7 l4 push-l2">
        <div class="card" style="width:300px;">
          <div class="card-image">
            <img src="현근창10.jpg" >
          </div>
          <div class="card-content">
            <h6 style="font-weight:bold">${topics[i].maindesc}</h6><p>${topics[i].service}</p
            <br><br>
            <p>${topics[i].name}<p>
            <br>
            <p><i class="material-icons" style="font-size:15px">location_on</i>&nbsp${topics[i].region}&nbsp&nbsp
            <i class="material-icons" style="font-size:15px">payments</i>&nbsp${topics[i].price}</p>
          </div>
          <div class="card-action" style="background-color:black">
            <a href="?id=${topics[i].email}" style="color:white; font-size:15px; font-weight:bold">&nbsp&nbsp&nbsp자세히 보기</a>
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
    },control:function(mainphoto,maindesc,sevdesc,price,photographer,customer){
        var control = `
      <div class="conatiner" style="margin-top:100px">
        <div class="row">
          <div class="col s12 l4 push-l1">
            <a>${mainphoto}</a>
            <img src="${mainphoto}" alt="" class="responsive-img materialboxed"/>
          </div>
          <div class="col s12 l6 offset-l2 left-align">
            <h4 style="font-weight: 600">${maindesc}</h4>
            <hr style="margin-top:40px; margin-bottom:40px;">
            <div>
              <h5 style="font-weight:bold">작가 정보</h5>
              <h6>메일 주소 : ${photographer}</h6>
              <h5 style="font-weight:bold; margin-top:50px">상품 설명</h5>
              <h6>${sevdesc}</h6>
              <h5 style="font-weight:bold; margin-top:50px">가격</h5>
              <h6>${price} 원</h6>
            </div>
            <div style="margin-top:40px">
              <a href="/chat?id=${photographer}${customer}&user=${customer}"><div class="card-panel black white-text" style="padding:10px; text-align:center;"><h6>채팅으로 촬영 상담</h6></div></a>
              <a class="white black-text" href="/pay.html"><div class="card-panel white" style="padding:10px; text-align:center;"><h6>결제 진행</6></div></a>
            </div>
        </div>
      </div>

      <div class="row" style="margin-top:100px">
        <div class="col s12 l4"><h5 style="font-weight:bold">포트폴리오</h5></div>
        <div class="col s12 l2 push-l5"><a class="waves-effect black-text" href="portfolio.html">▶ 더보기</a></div>
      </div>
      <hr style="width:80%; margin-bottom:50px">
      <div style="margin-top: 50px; margin-bottom: 200px;">

      <div class="row">
      <div class="col s12 push-l1">
        <div class="gallery">
          <a target="_blank" href="현근창1.jpg"/>
            <img src="현근창1.jpg" alt="photo1">
          </a>
        </div>
        
        <div class="gallery">
          <a target="_blank" href="현근창2.jpg">
            <img src="현근창2.jpg" alt="photo2"/>
          </a>
        </div>

        <div class="gallery">
          <a target="_blank" href="현근창3.jpg">
            <img src="현근창3.jpg" alt="photo3"/>
          </a>
        </div>
        
        <div class="gallery">
          <a target="_blank" href="현근창4.jpg">
            <img src="현근창4.jpg" alt="photo4"/>
          </a>
        </div>
      </div>
      </div>

          
</div></div>

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
  