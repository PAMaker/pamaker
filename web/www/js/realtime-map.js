let markers = []

$(function () {
  // socket.io 서버 접속
  const socket = io()

  // socket.on('login', function (data) {})

  let cLocation = document.getElementById('cLocation')
  let pLocation = document.getElementById('pLocation')

  // 서버로부터의 markers 배열이 수신되면 작가들의 정보를 목록으로 생성
  socket.on('markers', function (markers) {
    this.markers = markers

    createPhotographerList(markers)

    // initMap(); 이거 다시 재실행해야하는지는 모르겠다.
    // console.log('from realtime-map : ' + markers)
  })

  function createPhotographerList(markers) {
    pLocation.innerHTML = '' // 기존 목록을 초기화하고 다시 생성

    pLocation.classList.add('collection')
    document.getElementById('listHead').innerHTML = '<br>내 주변 작가 목록<br>'

    // markers 길이(작가 수)만큼 실행
    let i
    for (i = 0; i < markers.length; i++) {
      let pInfo = document.createElement('li')

      pInfo.classList.add('collection-item')
      pInfo.classList.add('avatar')

      let pImage = document.createElement('img') // 이미지
      let pName = document.createElement('p') // 이름
      let pPosition = document.createElement('span') // 위치
      let pChatLink = document.createElement('a') // 채팅

      pImage.setAttribute('src', 'stars.jpg')
      pImage.classList.add('circle')

      pName.innerText = markers[i][1]
      pPosition.innerHTML =
        '<p>' + markers[i][2] + ', ' + markers[i][3] + '</p>'

      pChatLink.classList.add('secondary-content')
      pChatLink.setAttribute('href', '#')
      pChatLink.setAttribute('title', '채팅하기')
      pChatLink.innerHTML = '<i class="material-icons">chat</i>'

      pInfo.appendChild(pImage)
      pInfo.appendChild(pName)
      pInfo.appendChild(pPosition)
      pInfo.appendChild(pChatLink)

      pLocation.appendChild(pInfo)
    }
  }

  function showPosition(position) {
    cLocation.innerHTML =
      '<br>회원님의 현재 위치 : ' +
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
  let cbnu = { lat: 36.629695, lng: 127.456253 } //일단 지도 중심은 학교로 설정
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: cbnu,
  })

  // markers 배열
  let marker, i
  for (i = 0; i < markers.length; i++) {
    marker = new google.maps.Marker({
      id: i,
      position: new google.maps.LatLng(markers[i][0], markers[i][1]),
      map: map,
    })
  }

  // 마커 클릭하면 정보 표시
  let infowindow = new google.maps.InfoWindow()
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
