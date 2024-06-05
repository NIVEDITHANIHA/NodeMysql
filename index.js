const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mysqlConnection = require("./config/db");
const router = require('./routers/router')

let result = dotenv.config();
// console.log(result);


const server = express();
/* Npm Package  */
server.use(morgan("dev"));
/* For parsing object to json */
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(router);

server.get("/", (req, res) => {
  res.send("<h1>Hello Niveditha</h1>");
  res.end(); 
});

const port = process.env.PORT || 4200; 


mysqlConnection.query("SELECT 1")
  .then(() => {
    console.log('Mysql Database connected'.bgGreen.bgBlue);
    server.listen(port, () => {
      console.log("Server is listening".bgBlue.white, port);
    });
  })
  .catch((err) => {
    console.log("err".bgGreen.bgBlue,err);
  });
