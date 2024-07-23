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
  console.log(`Server connected successfully ${socket.id}`);
  socket.on("message", (data) => {
    date = new Date();
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    
    const formattedDate = date.toLocaleString('en-US', options).replace(',', '');
    console.log(formattedDate);
    
    console.log(`Received message: ${data}`);
    createServer.emit("message", `${socket.id}, ${data} ${formattedDate}`);
  });
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
