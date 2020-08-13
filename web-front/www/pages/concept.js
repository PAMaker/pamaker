// document
//   .getElementsByClassName('tablinks')
//   .addEventListener('click', openCity(event, 'London'))

document
  .getElementById('tab1')
  .addEventListener('click', openCity(event, 'London'))
document
  .getElementById('tab2')
  .addEventListener('click', openCity(event, 'Paris'))
document
  .getElementById('tab3')
  .addEventListener('click', openCity(event, 'Tokyo'))
document
  .getElementById('tab3')
  .addEventListener('click', openCity(event, 'Event'))

function openCity(evt, cityName) {
  var i, tabcontent, tablinks
  tabcontent = document.getElementsByClassName('tabcontent')
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none'
  }
  tablinks = document.getElementsByClassName('tablinks')
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '')
  }
  document.getElementById(cityName).style.display = 'block'
  evt.currentTarget.className += ' active'
}