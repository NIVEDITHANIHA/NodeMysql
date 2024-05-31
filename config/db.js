const mysql = require("mysql2/promise")

const mysqlConnection =  mysql.createPool({
    host:"localhost",
    user:"root",
    database:"student_db"
})
module.exports = mysqlConnection