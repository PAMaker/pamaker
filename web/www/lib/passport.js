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
    // console.log('deserialzeuser',id); // serialize 에서 받은 식별자(name)을 아이디 값으로 해서 db에서 정보 가져옴
    // var sql = 'SELECT * FROM photographer,customer WHERE id=?';
    // db2.query(sql, [id], function(err, results){
    //   if(err)
    //     return done(err, false);
    //   if(!results[0])
    //     return done(err, false);
  
    //   console.log(results[0]);
    //     return done(null, results[0]);
    //});
  });



    //db에 저장되있는 customer 테이블 로부터 name,email 비교
// passport.use(new LocalStrategy(
//   {
//     usernameField:'name',
//     passwordField:'password'
//   },
//   function(username,password,done){
//     console.log('LocalStrategy',username,password); //name, password 잘 전달됨!
//     //db로부터 가져와서 비교
    

//     //
//      var sql ='SELECT * FROM photographer WHERE name=?';


//      db2.query(sql, [username], function(err,rows){
//         console.log(rows);
//         console.log(rows[0].name);//현근창
//         console.log(rows[0].password);//0
//         if(err) return done(err);
//         console.log(rows.length);//1 -> 있다
//         if(rows.length){
//           return done(false,null);
//         }else{
//           return done(null,false,{'message':'your name is not found'})
//         }
//       //  if(results[0].name === username && results[0].password === password)
//       //  {
//       //    return done(null,results);
//       //  }  
//       // else
//       //  return done(null,false,{message:'incorrect'});      
//      })


//       //  var user = results[0];
//       //  crypto.pbkdf2(password, user,'salt',100000,64,'sha512',function(err,derivedKey){
//       //   if(err)
//       //     return done(err);

//       //   if(derivedKey.toString('hex')===user.password)
//       //     return done(null,user);
//       //   else
//       //     return done('please check your password.');


//       //  });//pbkdf2
//    //});//query

//     }
  
// ));

passport.use('local-join',new LocalStrategy({
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
passport.use('local-join',new LocalStrategy({
  usernameField:'email',
  passwordField:'password',
  passReqToCallback: true
},function(req,email,password,done){
  var query = db2.query('select * from photographer where email=?',[email], function(err,rows){
    
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
