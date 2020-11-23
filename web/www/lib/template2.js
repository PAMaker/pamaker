module.exports = {
  HTML: function (title, list, plist, list2, body) {
    return `<!DOCTYPE html>
      <html>
      <head>
        <title></title>
        <meta charset = "utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=no", initial-scale="1.0">
        <link rel="stylesheet" type="text/css" href="reset.css">

        <link rel="stylesheet" href="style2.css">
         <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        
        <link rel="stylesheet" type="text/css" href="first.css">
        <link rel="stylesheet" type="text/css" href="nav.css">
    
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <script>
        $(document).ready(function(){
          $('.collapsible').collapsible();
          M.updateTextFields();
      });
      </script>


    <style>
  .nav {
    background: #a8a4a4;
  }
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
  
  .cell_padding {
  padding : 1em;
  }
  
  
  
  .table_center {
  display : table;
  margin-left : auto;
  margin-right : auto;
  }

  .css-serial {
    counter-reset: serial-number; 
   }
   .css-serial td:first-child:before {
    counter-increment: serial-number; 
    content: counter(serial-number); 
   }


   #star_grade a{
    text-decoration: none;
    color: gray;
    font-size:2em;
  }
  #star_grade a.on{
      color: #FCDB61;
      font-size:2em;
  }


</style>
</head>

<body>
<nav>
  <div class="nav-wrapper">
    <a href="#!" class="brand-logo center"><i class="material-icons">linked_camera</i>22세기사진관</a>
    <ul id="nav-mobile" class="left">
        <li><a class="material-icons" href="/pmypage">keyboard_arrow_left</a></li>
      </ul>
      
    
    <ul id="nav-mobile" class="right">
    <li><a href="sass.html"><i class="material-icons">search</i></a></li></ul>
  </div>
</nav>
  
   


     
      <div class="container">
        <h2>${title}</h2>
        ${list}
        ${plist}
        ${list2}
        ${body}
  </div>
      
    <footer class="page-footer">
    <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper">
        <ul id="nav-mobile" class="center">
          <li><a class="material-icons" href="/first.html">home</a></li>
          <li><a class="material-icons" href="/fav">favorite_border</a></li>
          <li><a class="material-icons" href="/chat">chat</a></li>
        </ul>
          <ul id="nav-mobile" class="right">
             <li><a class="material-icons" href="/pmypage">account_circle</a></li>
          </ul>
        </ul>
      </div>
      </nav>
      </div>
    </footer>
    <script>
        $('#star_grade a').click(function(){
            $(this).parent().children("a").removeClass("on");  /* 별점의 on 클래스 전부 제거 */ 
            $(this).addClass("on").prevAll("a").addClass("on"); /* 클릭한 별과, 그 앞 까지 별점에 on 클래스 추가 */
            return false;
        });
</script>

  
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
