var markers = []
$(function () {
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
})

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
