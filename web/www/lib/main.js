const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');//여기
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');



console.log(chatForm);
console.log(chatMessages);
console.log(roomName);
console.log(userList);



// Get username and room from URL
// const { username, room } = qs.parse(location.search, {
//   ignoreQueryPrefix: true
// });

//현재 url 파라미터 값 가져옴
var para = document.location.href.split("?");

console.log(para);
console.log(para[1]);
console.log(para[1].split('&'));
var cut = para[1].split('&');

console.log(cut[0]);
console.log(cut[1]);

var first = cut[0].split('=');
var second = cut[1].split('=');
console.log(first);

var room = decodeURIComponent(first[1]);
console.log(room);//현근창송예인
var photoname = room.substr(0,3);
console.log(photoname);//현근창
var username = decodeURIComponent(second[1]);
console.log(username);


///
// var username = '송예인';
// var room = '송예인현근창';
//url 에서 얻어온 값으로 바꿔야 함

console.log(username);
const socket = io();

// Join chatroom
//room 을 id+user 로 고유한 방번호로 만들기
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', message => {
  console.log(message);
  console.log(1);//message 라는 이벤트가 발행하고
  outputMessage(message); //inner html 써줌 //얘가 실행됨

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get message text
  const msg = e.target.elements.msg.value;

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOMusername = getParameterByName(user);





function outputMessage(message) {
  const div = document.createElement('div');//요소 생성
  div.classList.add('message'); //message 라는 클래스 생성

  console.log(2);

  
  
  div.innerHTML = `
  <p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;

  document.querySelector('.chat-messages').appendChild(div);
}

  


// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = photoname;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `;
}
