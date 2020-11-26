module.exports = {
    HTML:function(authStatusUI='<a href="/auth/login">로그인</a> | <a href="/auth/register">회원가입</a>'){
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
        <script src="navbarLink.js></script>
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

<div class="container" style="padding:60px">
  <h6>반갑습니다!</h6>
  <h5><a href ="login" style="color:cadetblue; border-bottom: cadetblue;">${authStatusUI}</a></h5>
  <ul class="collapsible expandable" >
    <li>
    <a href="/auth/changemyinfo">
      <div class="collapsible-header">
        <i class="material-icons">account_box</i>
        내정보변경
        <span class="badge">1</span></div></a>
      <div class="collapsible-body">
        <div class="box" style="background: #BDBDBD; float:left;"  ">
          <img class="profile" src="/images/tistory.JPG">
        </div>
      <div>
        <ul>
          <li class="id" style="padding:5px">ID : 아이디</li>
          <li class="id"style="padding:5px">생년월일 : 아이디</li>
          <li class="id"style="padding:5px">이용건수 : 아이디</li>
          <li class="id"style="padding:5px">포인트 : 아이디</li>
          <li class="id"style="padding:5px">포인트 : 아이디</li>
          <br>
        </ul>
    </div>
    <a class="waves-effect waves-light btn-small" href="photographer2.html" style=" float:right; "><i class="material-icons right">add</i>정보 수정</a><br>
      </div>
    </li>
    <li>
    <a href="/qna/question">
      <div class="collapsible-header">
        <i class="material-icons">message</i>
        문의
        <span class="badge">1</span></div></a>
      <div class="collapsible-body">
        <p>
          <div class="row">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s6">
                  <input id="inquirytitle" type="text" data-length="10">
                  <label for="inquirytitle">제목</label>
                </div>
              </div>
              <div class="row">
                <div class="input-text col s12"  style="overflow-y:scroll;">
                  <textarea name="inquiry" cols="35" row="10" >내용을 입력하세요</textarea>
                  
                </div>
              </div>
              <button class="btn waves-effect waves-light" type="submit" name="action">Submit<i class="material-icons right">send</i></button>
            </form>
          </div>
        <div class="row">
          <table class="list" style="border:1px;">
            <thead style="margin:10px;"><h5>문의 내역</h5></thead>


            <tr>
              <th>날짜</th>
              <th>문의제목</th>
              <th>접수</th>
            </tr>
            <tr>
              <td>2020-08-06</td>
              <td><a href ="ww.html">환불해주세요</a></td>
              <td>승인</td>
            </tr>
            <tr>
              <td>2020-08-06</td>
              <td><a href ="ww.html">환불해주세요</a></td>
              <td>미승인</td>
            </tr>
          </table>
        </div>
      </p>
      </div>
    </li>

    <li>
      <div class="collapsible-header">
        <i class="material-icons">party_mode</i>
        촬영목록
        <span class="badge">1</span></div>
    </li>
    <li>
      <div class="collapsible-header">
        <i class="material-icons">monetization_on</i>
        쿠폰
        <span class="new badge">4</span></div>
      <div class="collapsible-body">
        
        <p>Lorem ipsum doldfsfskjkdkjkdslr sit amet.</p>
      
      </div>
    </li>
  </ul>
</div>


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


</body>
</html>
      `;
    }
  }