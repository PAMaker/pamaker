document.getElementById('outer3').addEventListener('click', toggleState3)

function clickButtonFunction() {
  if (localStorage.getItem('clickCounter') === null) {
    localStorage.setItem('clickCounter', '0')
  }

  var value = parseInt(localStorage.getItem('clickCounter'))
  console.log(value)
  
  var newValue = value + 1
  localStorage.setItem('clickCounter', newValue)
  document.getElementById('clickCounter').innerHTML = '좋아요 ' + newValue
}

function toggleState3() {
  let galleryView = document.getElementById('galleryView')
  let tilesView = document.getElementById('tilesView')
  let outer = document.getElementById('outer3')
  let slider = document.getElementById('slider3')
  let tilesContainer = document.getElementById('tilesContainer')

  if (slider.classList.contains('active')) {
    slider.classList.remove('active')
    outer.classList.remove('outerActive')
    galleryView.style.display = 'flex'
    tilesView.style.display = 'none'

    while (tilesContainer.hasChildNodes()) {
      tilesContainer.removeChild(tilesContainer.firstChild)
    }
  } else {
    slider.classList.add('active')
    outer.classList.add('outerActive')
    galleryView.style.display = 'none'
    tilesView.style.display = 'flex'

    for (let i = 0; i < imgObject.length - 1; i++) {
      let tileItem = document.createElement('div')
      tileItem.classList.add('tileItem')
      tileItem.style.background = 'url(' + imgObject[i] + ')'
      tileItem.style.backgroundSize = 'contain'
      tilesContainer.appendChild(tileItem)

      let likeIcon = document.createElement('button')
      likeIcon.innerHTML = '&#x2764;'
      likeIcon.classList.add('clickButton')
      mainView.append(likeIcon)

      let clickButton = document.getElementsByClassName('clickButton')
      console.log(clickButton)
      //clickButton.onclick = clickButtonFunction()
      clickButton.innerHTML =
        '<button class=" onclick="clickButtonFunction()" >&#x2764;</button>'
      //clickButton.classList.add('clickButton')
      tileItem.append(clickButton)

      let clickCounter = document.getElementById('clickCounter')
      clickCounter.innerHTML = '<div id="clickCounter"></div>'
      tileItem.append(clickCounter)
    }
  }
}

let imgObject = [
  'https://placeimg.com/450/450/any',
  'https://placeimg.com/450/450/animals',
  'https://placeimg.com/450/450/architecture',
  'https://placeimg.com/450/450/nature',
  'https://placeimg.com/450/450/people',
  'https://placeimg.com/450/450/tech',
  'https://picsum.photos/id/1/450/450',
  'https://picsum.photos/id/8/450/450',
  'https://picsum.photos/id/12/450/450',
  'https://picsum.photos/id/15/450/450',
  'https://picsum.photos/id/5/450/450',
]

let mainImg = 0
let prevImg = imgObject.length - 1
let nextImg = 1

function setImgObject() {
  imgObject = imgOp3
  mainImg = 0
  prevImg = imgObject.length - 1
  nextImg = 1
  loadGallery()
}

function loadGallery() {
  let mainView = document.getElementById('mainView')
  mainView.style.background = 'url(' + imgObject[mainImg] + ')'

  // let likeIcon = document.createElement('button')
  // likeIcon.innerHTML = '&#x2764;'
  // likeIcon.classList.add('bottom-right')
  // mainView.append(likeIcon)

  let leftView = document.getElementById('leftView')
  leftView.style.background = 'url(' + imgObject[prevImg] + ')'

  let rightView = document.getElementById('rightView')
  rightView.style.background = 'url(' + imgObject[nextImg] + ')'

  let linkTag = document.getElementById('linkTag')
  linkTag.href = imgObject[mainImg]
}

function scrollRight() {
  prevImg = mainImg
  mainImg = nextImg
  if (nextImg >= imgObject.length - 1) {
    nextImg = 0
  } else {
    nextImg++
  }
  loadGallery()
}

function scrollLeft() {
  nextImg = mainImg
  mainImg = prevImg

  if (prevImg === 0) {
    prevImg = imgObject.length - 1
  } else {
    prevImg--
  }
  loadGallery()
}

document.getElementById('navRight').addEventListener('click', scrollRight)
document.getElementById('navLeft').addEventListener('click', scrollLeft)
document.getElementById('rightView').addEventListener('click', scrollRight)
document.getElementById('leftView').addEventListener('click', scrollLeft)
document.addEventListener('keyup', function (e) {
  if (e.keyCode === 37) {
    scrollLeft()
  } else if (e.keyCode === 39) {
    scrollRight()
  }
})

loadGallery()
// dkfjsdkfjdsk
