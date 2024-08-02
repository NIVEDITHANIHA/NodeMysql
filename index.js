const express = require("express");
const { Server } = require('socket.io');
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mysqlConnection = require("./config/db");
const router = require('./routers/router');
const routerSequelize = require('./routers/routersequillize');
const helmet = require("helmet");
const http = require("http");
const cors = require("cors");
const { emailSend } = require("./controller/Mail/sendmail");

// Load environment variables
dotenv.config();

const appServer = express();

// Secure HTTP headers
appServer.use(helmet());

// Middleware
appServer.use(morgan("dev"));
appServer.use(express.json());
appServer.use(express.urlencoded({ extended: true }));

// Enable CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:4200', 'http://127.0.0.1:5500'],
};
appServer.use(cors(corsOptions));

// Routers
appServer.use(router);
appServer.use(routerSequelize);
appServer.use(express.static("public"));

const port = process.env.PORT || 4200;

const createConnection = http.createServer(appServer);

const createServer = new Server(createConnection, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:4200', 'http://127.0.0.1:5500'],
  },
});

createServer.on("connection", (socket) => {
  let storedName ;
  let storedRoom ;

  console.log(`Server connected successfully ${socket.id}`);
  // ? for  the users who  are using 
  socket.emit("commonchat" ,  {"text" : "Welcome to the chat APP"});
  socket.on("message", (data) => {
    console.log(data);
    date = new Date();
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    
    const formattedDate = date.toLocaleString('en-US', options).replace(',', '');
    console.log(formattedDate);
    

    console.log(`Received message: ${socket.id.substring(0,4)}, ${JSON.stringify(data)}, ${formattedDate}`);
    createServer.emit("message", 
      {"text" : data.text,
        "name": data.name,
        "chatRoom" : data.chatRoom,
        "date" :formattedDate

    });

    storedName = data.name
    storedRoom = data.chatRoom
  
  });


  socket.on("chatroom" ,()=>{
    console.log(storedRoom);
    createServer.emit("chatroom" ,{
      name : storedName,
      chatRoom:storedRoom
    } )

  })

  socket.on("disconnect",()=>{
    createServer.emit("disconnected" ,`${storedName} the User is Disconected `)
  })

  socket.on("activity",()=>{
    console.log(storedName);
    socket.broadcast.emit("activity" ,`${storedName} is Typing ... `)

  })
});

appServer.get("/", (req, res) => {
  res.send("<h1>Hello Niveditha</h1>");
});

mysqlConnection.query("SELECT 1")
  .then(() => {
    console.log('MySQL Database connected'.bgGreen.bgBlue);
    createConnection.listen(port, () => {
      console.log("Server is listening".bgBlue.white, port);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MySQL Database".bgGreen.bgBlue, err);
  });
