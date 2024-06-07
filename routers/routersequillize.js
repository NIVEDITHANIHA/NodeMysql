const express = require('express');
const { getStudents } = require('../controller/studentsequilizeController');
const routerSequilize = express.Router()


/* get All Api */
routerSequilize.get("/getStudents", getStudents);


module.exports = routerSequilize;