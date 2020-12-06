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
<a href="/" class="brand-logo black-text"><img src="logo_background.png" style="width: 80px" alt="" /></a>
</nav>
</header>
  
  
     
      <div class="container">
        <h2>${title}</h2>
        ${list}
        ${plist}
        ${list2}
        ${body}
  </div>
      
<footer>
  <nav>
  <div class="nav-wrapper">
      <ul id="nav-mobile" class="center">
        <li><a class="material-icons" href="first.html"></a></li>
        <li><a class="material-icons" href="first.html"></a></li>
        <li><a class="material-icons" href="first.html"></a></li>
        <li><a class="material-icons" href="first.html">home</a></li>
        <li><a class="material-icons" href="fav">favorite_border</a></li>
        <li><a class="material-icons" href="/pchat">chat</a></li>
        <li><a class="material-icons" href="mypage">account_circle</a></li>
        <li><a class="material-icons" href="first.html"></a></li>
        <li><a class="material-icons" href="first.html"></a></li>
      </ul>
    </div>
  </nav>
</footer>

  </body>
  </html>
      `
  },
  list: function (topics) {
    var bestList ='<h5>Best 후기</h5> <div class="row">'
    var photoList ='<h5>포토후기</h5> <div class="row">'
    var textList ='<h5>일반후기</h5><div><ul class="collection">'
    var reviewElements = ``
    var i = 0
    while (i < topics.length) {
      if (topics[i].photo == 'y') {
        reviewElements = `
        <div class="col s12 m6 l4">
          <div class="card" style="width:300px">
            <div class="card-image">
              <img src="촬영1팀(1).jpg">
              <span class="card-title"><h5>${topics[i].title}</h5><h6>★★★★★</h6></span>
              <a class="btn-floating halfway-fab waves-effect waves-light black" href="?id=${topics[i].id}"><i class="material-icons">search</i></a>
            </div>
            <div class="card-content">
            <p style="font-size:small"><span style="font-weight:bold">작성자&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>${topics[i].author}</p>
            <p style="font-size:small"><span style="font-weight:bold">촬영 작가&nbsp&nbsp</span>작가1</p>
            </div>
          </div>
        </div>
      `
      photoList = photoList + reviewElements
    }
      else {
        reviewElements = `
        <li class="collection-item avatar">
          <span class="title">${topics[i].title}</span>
          <p style="font-size:small; text-align:right; margin-right: 100px"><span style="font-weight:bold">작성자&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>${topics[i].author} <br>
          <span style="font-weight:bold">촬영 작가&nbsp&nbsp</span>작가1
          </p>
          <a href="#!" class="secondary-content"><i class="material-icons">search</i></a>
        </li>
                
        `
      //   reviewElements = `
      //   <div class="row">
      //   <div class="col s12 m6">
      //     <div class="card" style="width:300px">
      //       <div class="card-image">
      //         <img src="촬영1팀(1).jpg">
      //         <span class="card-title"><h5>${topics[i].title}</h5><h6>★★★★★</h6></span>
      //         <a class="btn-floating halfway-fab waves-effect waves-light black" href="?id=${topics[i].id}"><i class="material-icons">search</i></a>
      //       </div>
      //       <div class="card-content">
      //       <p style="font-size:small"><span style="font-weight:bold">작성자&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>${topics[i].author}</p>
      //       <p style="font-size:small"><span style="font-weight:bold">촬영 작가&nbsp&nbsp</span>작가1</p>
      //       </div>
      //     </div>
          
      //   </div>
      // </div>

      //   `
        textList = textList + reviewElements
      }
      if (topics[i].best == 'y') {
        bestList = bestList + reviewElements
      }
      i = i + 1
    } 
    bestList = bestList + '</div>'
    photoList = photoList + '</div>'
    textList = textList + '</ul></div>'

    return bestList + photoList + textList
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
    while(i<1){
      list2 = 
      list2 + `
      
      <div class="card horizontal">
        <div class="card-image">
          <img src="photographer1.jpg" width="200px" height="200px"> 
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p><a>현근창</a></p>
          </div>
          <div class="card-action">
            <a href="/chat?id=egoing777@gmail.comdpdls0603@naver.com&user=dpdls0603@naver.com">채팅하기</a>
          </div>
        </div>
      </div>
      <div class="card horizontal">
        <div class="card-image">
          <img src="cat1.jpg" width="200px" height="200px"> 
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p><a>애플주니</a></p>
          </div>
          <div class="card-action">
            <a href="/chat?id=dauern2016@naver.comdpdls0603@naver.com&user=dpdls0603@naver.com">채팅하기</a>
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
