var express = require('express')
var router = express.Router()
var ptemplate = require('../lib/ptemplate.js')
var auth = require('../lib/auth')

var path = require('path')
var fs = require('fs')
var sanitizeHtml = require('sanitize-html')

//http://localhost:8080/pmypage

router.get('/', function (request, response) {
  console.log('/', request.user)
  var fmsg = request.flash()
  var feedback = ''
  if (fmsg.success) {
    feedback = fmsg.success[0]
  }
  var html = ptemplate.HTML(auth.statusUI(request, response), ``)
  response.send(html)
})

module.exports = router
