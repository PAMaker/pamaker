var mysql = require('mysql');

var db2 = mysql.createConnection({
    host: "management.c96otstrvsjv.us-east-2.rds.amazonaws.com",
    user: "user",
    database: "management_tutorial",
    password: "eja959595~",
    port: 3306
});

db2.connect();

module.exports = db2; //외부로 꺼내 사용할 수 있다

//후기용 db