const { createDecipheriv } = require('crypto')

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
        <link rel="stylesheet" type="text/css" href="first.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js">
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
#star a{
  text-decoration: none; color: gray; } 

#star a.on{ 
 color:orange; }


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
        <h4>${title}</h4><br>
        ${list}
        ${body}
        ${control}
    
  </div>
      
    <footer class="page-footer" >
    <nav>
      <div class="nav-wrapper">
        <ul id="nav-mobile" class="center">
          <li><a class="material-icons" href="first.html">home</a></li>
          <li><a class="material-icons" href="fav">favorite_border</a></li>
          <li><a class="material-icons" href="chat/chat.html">chat</a></li>
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
    function tsort(n) {
      var table,
        rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        switchcount = 0
      table = document.getElementById('list')
      switching = true
      dir = 'asc'
      while (switching) {
        switching = false
        rows = table.rows
        for (i = 1; i < rows.length - 1; i++) {
          shouldSwitch = false
          x = rows[i].getElementsByTagName('TD')[n]
          y = rows[i + 1].getElementsByTagName('TD')[n]
          if (dir == 'asc') {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true
              break
            }
          } else if (dir == 'desc') {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true
              break
            }
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
          switching = true
          switchcount++
        } else {
          if (switchcount == 0 && dir == 'asc') {
            dir = 'desc'
            switching = true
          }
        }
      }
    }

    var list =
      '<table id="list"><thead><tr><th>no.</th><th onclick="tsort(1)">제목</th><th>작성시간</th></tr></thead>'

    // document.getElementById('dfd').addEventListener('click', tsort(0))
    list.addEventListener('click', tsort(0))

    var i = 0

    while (i < topics.length) {
      var created = topics[i].created
      var scr = String(created)
      var time = scr.substr(0, 16)
      list =
        list +
        `<tbody><tr><td>${topics[i].id}</td><td><a href="?id=${topics[i].id}">${topics[i].title}</a></td><td>${time}</td></tr></tbody>`

      i = i + 1
    }
    list = list + '</table>'
    return list
  },
}
