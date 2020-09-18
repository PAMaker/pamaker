var express = require('express')
var router = express.Router()
var ptemplate = require('../lib/ptemplate.js')
var pauth = require('../lib/pauth');
var path = require('path')
var fs = require('fs')
var sanitizeHtml = require('sanitize-html')



router.get('/', function (request, response) {
  console.log('/', request.user)
  var fmsg = request.flash()
  var feedback = ''
  if (fmsg.success) {
    feedback = fmsg.success[0]
  }
  var html = ptemplate.HTML(pauth.statusUI(request, response), ``)
  response.send(html)
})

module.exports = router
