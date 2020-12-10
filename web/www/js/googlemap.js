$(function () {
  var checkbox = document
    .getElementById('checkbox')
    .addEventListener('click', askForCoords)

  // socket.io 서버 접속
  var socket = io()

  // console.log(request.user.id)
  // console.log(request.user.email)

  // 서버로 자신의 정보 전송
  // socket.emit('photographerInfo', {
  //   name: '',
  //   userid: '1', // 임의로 설정한 id -> db연동 필요
  // })

  function handleGeoSucces(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const coordsObj = {
      latitude,
      longitude,
    }

    document.getElementById('position').innerHTML =
      '현재 위치 확인 ' +
      position.coords.latitude +
      '&nbsp' +
      position.coords.longitude

    console.log(coordsObj)

    // 서버로 위치 정보 전달
    socket.emit('location', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  }

  function handleGeoError() {
    console.log(`Can't access geo location`)
  }

  function askForCoords() {
    alert('위치 정보 수집이 허용되었습니다.')
    // navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
    var options = { timeout: 30000 } // 30초 간격으로 위치 추적
    navigator.geolocation.watchPosition(
      handleGeoSucces,
      handleGeoError,
      options
    )
  }
})

// function handleGeoSucces(position) {
//   const latitude = position.coords.latitude
//   const longitude = position.coords.longitude
//   const coordsObj = {
//     latitude,
//     longitude,
//   }

//   document.getElementById('position').innerHTML =
//     '현재 위치 : ' +
//     position.coords.latitude +
//     '&nbsp' +
//     position.coords.longitude

//   console.log(coordsObj)
// }

// function handleGeoError() {
//   console.log(`Can't access geo location`)
// }

// function askForCoords() {
//   navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
// }

// askForCoords()

// function initMap(coordsObj) {
//   var marker = new google.maps.Marker({ position: cbnu, map: map })
//   var cbnu = { lat: 36.629695, lng: 127.456253 } //일단 지도 중심은 학교로 설정
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 15,
//     center: cbnu,
//   })
// }
