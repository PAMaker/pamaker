var mysql = require('mysql');

var db2 = mysql.createConnection({
    host: "mysql8001.coreicc.net",
    user: "pamaker",
    database: "pamaker_main",
    password: "YeInPhoto80_",
    port: 3306
});

db2.connect();

module.exports = db2; //외부로 꺼내 사용할 수 있다

//