var db2 = require('../lib/db2')
var flash = require('connect-flash')
var crypto = require('crypto')
const { connect } = require('../lib/db2')

module.exports = function (app) {
  var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy

  //passport 를 express에 설치하기
  app.use(passport.initialize())
  app.use(passport.session())

  //flash 메시지 띄우기
  app.use(flash())
  app.get('/flash', function (req, res) {
    req.flash('msg', 'Flash is back!!!')
    res.send('flash')
  })

  app.get('/flash-display', function (req, res) {
    var fmsg = req.flash()
    console.log(fmsg)

    res.send(fmsg)
  })

  //로그인 성공시 세션안에 passport 안에 user 에 식별자 저장하는 역활
  passport.serializeUser(function (user, done) {
    console.log('serializeUser', user)
    done(null, user.id) //식별자를 session 에 넣어준다
  })
  //필요한 정보를 호출할때 사용
  // passport.deserializeUser(function(id,done){
  //     var user = db.get('users').find({
  //       id: id
  //     }).value();
  //     console.log('deserializeUser', id, user);
  //     done(null, user);
  // });

  passport.deserializeUser(function (id, done) {
    console.log('deserialzeuser', id) // serialize 에서 받은 식별자(name)을 아이디 값으로 해서 db에서 정보 가져옴
    var sql =
      'SELECT * FROM customer CROSS JOIN (SELECT * FROM photographer) WHERE id=?'
    db2.query(sql, [id], function (err, results) {
      if (err) return done(err, false)
      if (!results[0]) return done(err, false)

      return done(null, results[0])
    })
  })

  //db에 저장되있는 customer 테이블 로부터 name,email 비교
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'name',
        passwordField: 'email',
      },
      function (username, password, done) {
        var sql =
          'SELECT * FROM customer CROSS JOIN (SELECT * FROM photographer)CNT WHERE id=?'
        db2.query(sql, [username], function (err, results) {
          if (err) return done(err)
          if (!results[0]) return done('please check your name.')

          var user = results[0] //
          console.log(user) // customer db 정보들

          //테이블에서 꺼내온 이메일 암호화 하기
          // crypto.pbkdf2(password, 'user.salt', 100000, 64, 'sha512', function(err,derivedKey){
          //   console.log(derivedKey.toString('hex'))
          //   console.log(user.email);
          //   if(err)
          //     return done(err);
          //   if(derivedKey.toString('hex')===user.email)
          //     return done(null, user);
          //   else
          //     return done('please check your email.');
          // });
          crypto.createHash('sha512').update(password).digest('hex')

          if (password == user.email) return done(null, user)
          else return done('please check your email')
        })
      }
    )
  )

  return passport
}
