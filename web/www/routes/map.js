var express = require('express')
var router = express.Router()
var path = require('path')
var fs = require('fs')
var sanitizeHtml = require('sanitize-html')
var template2 = require('../lib/template2.js')
var auth = require('../lib/auth')
var db2 = require('../lib/db2')
var shortid = require('shortid')
const socketio = require('socket.io')

router.get('/question', function (request, response) {
  // if (!auth.isOwner(request, response)) {

  //   response.redirect('/mypage')
  //   return false
  // }
  //   var title = '문의작성'

  //var list = template2.list(request.list);
  var html = template2.HTML(
    ` 
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Example</title>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <style>
          /* 지도 크기 */
          #map {
            height: 400px;
            width: 100%;
          }
        </style>
      </head>
      <body>
        <nav>
          <div class="nav-wrapper">
            <a href="#!" class="brand-logo center"
              ><i class="material-icons">linked_camera</i>22세기사진관</a
            >
    
            <ul id="nav-mobile" class="left">
              <li>
                <a class="material-icons" href="first.html">keyboard_arrow_left</a>
              </li>
            </ul>
            <ul id="nav-mobile" class="right">
              <li>
                <a href="page/sass.html"><i class="material-icons">search</i></a>
              </li>
            </ul>
          </div>
        </nav>
        <div class="container">
          <h4>실시간 위치 수집 중...</h4>
          <p id="geolocation"></p>
          <div id="map"></div>
        </div>
    
        <footer class="page-footer">
          <nav>
            <div class="nav-wrapper">
              <ul id="nav-mobile" class="center">
                <li><a class="material-icons" href="">home</a></li>
                <li><a class="material-icons" href="">favorite_border</a></li>
                <li><a class="material-icons" href="">chat</a></li>
              </ul>
              <ul id="nav-mobile" class="right">
                <li><a class="material-icons" href="mypage">account_circle</a></li>
              </ul>
            </div>
          </nav>
        </footer>
    
        <script src="jquery-3.5.1.min.js"></script>
        <script src="realtime-map.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script
          async
          defer
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA2MkxTkYDQdwq_8eSa4RXikN_s_Yra02s&callback=initMap"
        ></script>
        <script
          defer
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA2MkxTkYDQdwq_8eSa4RXikN_s_Yra02s&callback=initMap"
        ></script>
      </body>
    </html>
    
    `
  )
  response.send(html)
})

router.post('/', function (request, response) {
  if (!auth.isOwner(request, response)) {
    response.redirect('/')
    return false
  }
  var post = request.body
  console.log(request.user.email)
  db2.query(
    `
  INSERT INTO QNA (id,title,question) 
    VALUES(?,?,?)`,
    [request.user.email, post.title, post.question],
    function (error, result) {
      if (error) {
        throw error
      }
      response.redirect(`/mypage`) //질문 제출시 어디경로로??
    }
  )
})

var markers = []
// socket.io 서버 접속
var socket = io()

// 서버로 자신의 정보 전송
socket.emit('customerInfo', {
  name: '',
  userid: '3', // 임의로 설정한 id -> db연동 필요
})

// 서버로부터의 메시지가 수신되면
socket.on('login', function (data) {})

var x = document.getElementById('geolocation')

// 서버로부터의 markers 배열이 수신되면 클라이언트의 markers에 대입
socket.on('markers', function (markers) {
  this.markers = markers
  // 모든 사용자의 위치 (markers) 출력
  $('#geolocation').append(
    '<br><br>작가들의 위치 : <p>' + this.markers + '</p>'
  )
  // initMap(); 이거 다시 재실행해야하는지는 모르겠다.
  // console.log('from realtime-map : ' + markers)
})

function showPosition(position) {
  x.innerHTML =
    '<br>회원 현재 위치 : ' +
    position.coords.latitude +
    ' / ' +
    position.coords.longitude

  // 서버로 위치 정보 전달
  //   socket.emit('location', {
  //     latitude: position.coords.latitude,
  //     longitude: position.coords.longitude,
  //   })
}

// 에러 표시
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = 'User denied the request for Geolocation.'
      break
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = 'Location information is unavailable.'
      break
    case error.TIMEOUT:
      x.innerHTML = 'The request to get user location timed out.'
      break
    case error.UNKNOWN_ERROR:
      x.innerHTML = 'An unknown error occurred.'
      break
  }
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, showError)
} else {
  x.innerHTML = 'Geolocation is not supported by this browser.'
}

// google map & marker
function initMap() {
  var cbnu = { lat: 36.629695, lng: 127.456253 } //일단 지도 중심은 학교로 설정
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: cbnu,
  })

  // markers 배열
  var marker, i
  for (i = 0; i < markers.length; i++) {
    marker = new google.maps.Marker({
      id: i,
      position: new google.maps.LatLng(markers[i][0], markers[i][1]),
      map: map,
    })
  }

  // 마커 클릭하면 정보 표시
  var infowindow = new google.maps.InfoWindow()
  google.maps.event.addListener(
    marker,
    'click',
    (function (marker, i) {
      return function () {
        //html로 표시될 인포 윈도우의 내용
        infowindow.setContent(
          '<div class="wrap"><div class="text-box"><h6>작가1</h6><div class="img-box"><img src="현근창1.jpg"></div><div><a class="material-icons" href="first.html">perm_identity</a>정보보기</div><div><a class="material-icons" href="first.html">chat_bubble</a>채팅하기</div></div>'
        )

        //인포윈도우가 표시될 위치
        infowindow.open(map, marker)
      }
    })(marker, i)
  )
}

module.exports = router
