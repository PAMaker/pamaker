var checkbox = document
  .getElementById('checkbox')
  .addEventListener('click', askForCoords)

function handleGeoSucces(position) {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  const coordsObj = {
    latitude,
    longitude,
  }

  document.getElementById('position').innerHTML =
    '현재 위치 : ' +
    position.coords.latitude +
    '&nbsp' +
    position.coords.longitude

  console.log(coordsObj)
  //   initMap(coordsObj)
}

function handleGeoError() {
  console.log(`Can't access geo location`)
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

// askForCoords()

// function initMap(coordsObj) {
//   var marker = new google.maps.Marker({ position: cbnu, map: map })
//   var cbnu = { lat: 36.629695, lng: 127.456253 } //일단 지도 중심은 학교로 설정
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 15,
//     center: cbnu,
//   })
// }
