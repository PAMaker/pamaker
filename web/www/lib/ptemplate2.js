module.exports = {
  HTML: function (title, list, body, control) {
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
<nav>
  <div class="nav-wrapper">
    <a href="#!" class="brand-logo center"><i class="material-icons">linked_camera</i>22세기사진관</a>
    <ul id="nav-mobile" class="left">
      
    </ul>
    <ul id="nav-mobile" class="right">
    <li><a href="sass.html"><i class="material-icons">search</i></a></li></ul>
  </div>
</nav>
  
   

     
      <div class="container">
        <h2>${title}</h2>
        ${list}
        ${body}
        ${control}
    
  </div>
      
    <footer class="page-footer">
    <nav>
      <div class="nav-wrapper">
        <ul id="nav-mobile" class="center">
          <li><a class="material-icons" href="first.html">home</a></li>
          <li><a class="material-icons" href="fav">favorite_border</a></li>
          <li><a class="material-icons" href="pchat">chat</a></li>
        </ul>
          <ul id="nav-mobile" class="right">
             <li><a class="material-icons" href="mypage">account_circle</a></li>
          </ul>
        </ul>
      </div>
      </nav>
    </footer>
  
  </body>
  </html>
      `
  },
  list: function (topics) {
    var list = '<ul>'
    var i = 0
    while (i < topics.length) {
      list =
        list + `<li><a href="?id=${topics[i].id}">${topics[i].title}</a></li>`
      i = i + 1
    }
    list = list + '</ul>'
    return list
  },
}
