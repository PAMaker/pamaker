var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth');

var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');

router.get('/', function (request, response) {
    console.log('/', request.user);
    var fmsg = request.flash();
    var feedback = '';
    if(fmsg.success){
      feedback = fmsg.success[0];
    }
  
    var title = '반갑습니다';
    var description = 'myinfo page';
    var html = template.HTML(title,
      `
      <div style="color:blue;">${feedback}</div>
        <h2>${title}</h2>${description}
        `,
      `<a href="/topic/create">create</a>`,
      auth.statusUI(request, response)
    );
    response.send(html);
  });

  module.exports = router;