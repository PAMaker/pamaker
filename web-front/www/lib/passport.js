var db = require('../lib/db');
var flash = require('connect-flash');

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
    done(null,user.id); //식별자를 세션에 넣어준다
    });
    //필요한 정보를 호출할때 사용
    passport.deserializeUser(function(id,done){
    
        var user = db.get('users').find({
            id: id
        }).value();
        console.log('deserializeUser', id, user);
        done(null, user);
    });
    
    //db에 저장되어 있는 아이디,비번과 비교
    
    passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'pwd'
    },
    function (email, password, done) {
        console.log('LocalStrategy', email, password);
        var user = db.get('users').find({
            email: email,
            password: password
        }).value();
        if (user) {
            return done(null, user, {
                message: 'Welcome.'
            });
      }else{
        return done(null, false, {
          message: 'Incorrect user information.'
        });
      }
    }
    ));
    return passport;
}
