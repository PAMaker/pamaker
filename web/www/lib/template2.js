module.exports = {
  HTML: function (title, list, plist, list2, body) {
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
  
      <link rel="stylesheet" type="text/css" href="/first.css">
      <link rel="stylesheet" type="text/css" href="/nav.css">
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
        <h2>${title}</h2>
        ${list}
        ${plist}
        ${list2}
        ${body}
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
      `
  },
  list: function (topics) {
    var list =
      '<nav style="background-color: #a8a4a4;"><div class="nav-wrapper"><ul class="left hide-on-med-and-down"><li><a href="#">photo</a></li><li><a href="badges.html">phone case</a></li><li class="active"><a href="collapsible.html">grip tok</a></li></ul></div></nav>'
    var i = 0
    while (i < topics.length) {
      list =
        list +
        `<table><tr>
        <td><div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="촬영1팀(1).jpg" style="width:450px;">
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4"><a href="?id=${topics[i].id}"></a><i class="material-icons right">more_vert</i></span>
          <p><a href="?id=${topics[i].id}">${topics[i].title}</a></p> 
        <p id="star_grade">
        <a href="#">★</a>
        <a href="#">★</a>
        <a href="#">★</a>
        <a href="#">★</a>
        <a href="#">★</a>
        </p>
        </div>
        
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${topics[i].title}<i class="material-icons right">close</i></span>
          <p>상세후기${topics[i].maindesc}</p>
            <div style="position:fixed; bottom:0px; width: auto;"> 
              <p style="text-align: left;">작성자 : ${topics[i].author}</p>
              <p style="text-align: left; ">작성시간 : ${topics[i].created}</p>
            </div>
        </div>
      </div></td>


      <td><div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="촬영1팀(2).jpg" style="width:450px; height:300px; overflow: hidden;">
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4"><a href="?id=${topics[i].id}"></a><i class="material-icons right">more_vert</i></span>
          <p><a href="?id=${topics[i].id}">${topics[i].title}</a></p> 
        <p id="star_grade">
        <a href="#">★</a>
        <a href="#">★</a>
        <a href="#">★</a>
        <a href="#">★</a>
        <a href="#">★</a>
        </p>
        </div>

        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${topics[i].title}<i class="material-icons right">close</i></span>
          <p>상세후기${topics[i].maindesc}</p>
            <div style="position:fixed; bottom:0px; width: auto;"> 
              <p style="text-align: left;">작성자 : ${topics[i].author}</p>
              <p style="text-align: left; ">작성시간 : ${topics[i].created}</p>
            </div>
        </div>
      </div></td>
      <td><div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="촬영1팀(3).jpg" style="width:450px;">
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4"><a href="?id=${topics[i].id}"></a><i class="material-icons right">more_vert</i></span>
          <p><a href="?id=${topics[i].id}">${topics[i].title}</a></p> 
        <p id="star_grade">
        <a href="#">★</a>
        <a href="#">★</a>
        <a href="#">★</a>
        <a href="#">★</a>
        <a href="#">★</a>
        </p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${topics[i].title}<i class="material-icons right">close</i></span>
          <p>상세후기${topics[i].maindesc}</p>
            <div style="position:fixed; bottom:0px; width: auto;"> 
              <p style="text-align: left;">작성자 : ${topics[i].author}</p>
              <p style="text-align: left; ">작성시간 : ${topics[i].created}</p>
            </div>
        </div>
      </div></td>
      </tr></table>
        <!--<tr><td>&nbsp;</td><td><a href="?id=${topics[i].id}">${topics[i].title}</a></td></tr>-->`
      i = i + 1
    }
    list = list + '</tbody></table>'
    return list
  },
  plist: function (topic) {
    var plist =
      '<table class="css-serial"><thead><tr><th>No.</th><th>제목</th></tr></thead><tbody>'
    var i = 0
    while (i < topic.length) {
      plist =
        plist +
        `<tr><td>&nbsp;</td><td><a href="?id=${topic[i].id}">${topic[i].maindesc}</a></td></tr>`
      i = i + 1
    }
    plist = plist + '</tbody></table>'
    return plist
  },
  list1: function (topics) {
    var list2 = '<ul> <div class="col s12 m7">'
    var i = 0
    while(i<topics.length){
      list2 = 
      list2 + `
      <div class="card horizontal">
        <div class="card-image">
          <img src="photograper1.jpg" width="200px" height="200px"> 
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p><a>${topics[i].pname}</a></p>
          </div>
          <div class="card-action">
            <a href="/chat?id=${topics[i].room}&user=${topics[i].uid}">채팅하기</a>
          </div>
        </div>
      </div>
        `
        i = i + 1
    }
    
    list2 = list2 + '</div> </ul>'
    return list2
  },
  list2: function (topics) {
    var list2 = '<ul> <div class="col s12 m7">'
    var i = 0
    while(i<topics.length){
      list2 = 
      list2 + `
      <div class="card horizontal">
        <div class="card-image">
          <img src="photograper1.jpg" width="200px" height="200px"> 
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p><a>${topics[i].uname}</a></p>
          </div>
          <div class="card-action">
            <a href="/chat?id=${topics[i].room}&user=${topics[i].pid}">채팅하기</a>
          </div>
        </div>
      </div>
        `
        i = i + 1
    }
    
    list2 = list2 + '</div> </ul>'
    return list2
  },
}
