module.exports = {
    list:function(topic){
        var list = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; ">
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
              integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk="
              crossorigin="anonymous"
            />
            <link rel="stylesheet" href="style.css" />
            <title>ChatCord App</title>
            
          </head>
          <body>
         
            <div class="chat-container">
              <header class="chat-header">
                <h1><i class="fas fa-smile"></i> 멍칵</h1>
                <a href="/chat" class="btn">채팅방나가기</a>
              </header>
              <main class="chat-main">
                <div class="chat-sidebar">
                  <h3><i class="fas fa-comments"></i>photographer</h3>
                  <h2 id="room-name"></h2>
                  <h3><i class="fas fa-users"></i>Me</h3>
                  <ul id="users"></ul>
                </div><div class="chat-messages">`;
           var i = 0;
           while(i < topic.length){
            list = list + `
            <div class="message">
            <p class="meta">&nbsp;${topic[i].uid} <span>${topic[i].time}</span></p>
            <p class="text">
            &nbsp;${topic[i].msg}
            </p></div>`
                i = i+1;
           }     
        
           list = list +`</div>
           </main>
           <div class="chat-form-container">
             <form id="chat-form">
               <input
                 id="msg"
                 type="text"
                 placeholder="Enter Message"
                 required
                 autocomplete="off"
               />
               <button class="btn"><i class="fas fa-paper-plane"></i> Send</button>
             </form>
           </div>
         </div>
     
         <Content-Security-Policy: script-src 'self' https://apis.google.com script
           src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.9.2/qs.min.js"
           integrity="sha256-TDxXjkAUay70ae/QJBEpGKkpVslXaHHayklIVglFRT4="
           crossorigin="anonymous"
         ></script>
         <script src="/socket.io/socket.io.js"></script>
         <script type="module" src="main.js"></script>
     
       </body>
     </html>`;
           
        return list;
    }






}