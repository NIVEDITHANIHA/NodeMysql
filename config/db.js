const mysql = require("mysql2/promise")
const dotenv = require("dotenv");
let result = dotenv.config();
const mysqlConnection =  mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.STUDENT_DB
})
module.exports = mysqlConnection


