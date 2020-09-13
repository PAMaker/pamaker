var db2 = require('../lib/db2');
var flash = require('connect-flash');
var crypto = require('crypto');
const { connect } = require('../lib/db2');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

module.exports = function (app){

    var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
    
    //passport 를 express에 설치하기
    app.use(passport.initialize());
    app.use(passport.session());

//flash 메시지 띄우기
    app.use(flash());
    app.get('/flash',function(req,res){
    req.flash('msg','Flash is back!!!');
    res.send('flash');    
  });

app.get('/flash-display',function(req,res){
  var fmsg = req.flash();
  console.log(fmsg);

  res.send(fmsg);
});
 //로그인 성공시 세션안에 passport 안에 user 에 식별자 저장하는 역활
 passport.serializeUser(function(user,done){
  console.log('serializeUser',user);

  done(null,user); //식별자를 session 에 넣어준다
  
  });

  passport.deserializeUser(function(id, done) {

    console.log('deserializeUser id:',id);
    done(null,id);

  });


// passport.use('local-join',new LocalStrategy({
//   usernameField:'email',
//   passwordField:'password',
//   passReqToCallback: true
// },function(req,email,password,done){
//   var query = db2.query('select * from customer where email=?',[email], function(err,rows){
    
//     if(err) return done(err);
//     if(rows.length){
//       return done(null,{'email':email,'password':password})
//     }else{
//       return done(null, false, {'message':'your login info is not found'});
//     }
//   })
  
// }
// ))
passport.use(new LocalStrategy({
  usernameField:'email',
  passwordField:'password',
  passReqToCallback: true
},function(req,email,password,done){
  var query = db2.query('select * from customer where email=?',[email], function(err,rows){
    
    if(err) return done(err);
    if(rows.length){
      return done(null,{'email':email,'password':password})
    }else{
      return done(null, false, {'message':'your login info is not found'});
    }
  })
  
}
))

    return passport;
}
