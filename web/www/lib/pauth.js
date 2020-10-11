module.exports = {

    //customer db에있는 해당 user 가 있는지 확인
  isOwner:function(request, response) {
      if (request.user) {
          return true;
      } else {
          return false;
      }
  },
  statusUI:function(request, response) {
      
          var authStatusUI = '<a href="/pauth/login">login</a> | <a href="photoregister.html">Register</a>';
      
          

          if (this.isOwner(request, response)) {
              authStatusUI = `${request.user.email} | <a href="/pauth/logout">logout</a>`;
              
          }
          return authStatusUI;      
    
  },
  statusUI2:function(request, response) {
      
      var authStatusUI = '<a href="/pauth/login">login</a>';
 
      

      if (this.isOwner(request, response)) {
          authStatusUI = `${request.user.email} | <a href="/pauth/logout">logout</a>`;
      }
      return authStatusUI;      

  },
    
}