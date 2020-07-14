const mysql = require('mysql')
const dbConfig = require("../config/db.config.js")

// create connection DB
const connection= mysql.createConnection({
    host : dbConfig.HOST,
    user : dbConfig.USER,
    password : dbConfig.PASSWORD,
    database : dbConfig.DB

})

//open mysql connection

connection.connect(error=>{
    if (error) throw error;
    console.log('Successfull connect to database')
})


module.exports=connection;


