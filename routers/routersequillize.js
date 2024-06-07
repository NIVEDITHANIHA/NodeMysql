const express = require('express');
const { getStudents, createStudentProfile, updateStudentProfile } = require('../controller/studentsequilizeController');
const { addProducts, getAllProducts } = require('../controller/productscontroller');
const routerSequilize = express.Router()

/*______________________________________________________________________________________________________________________________________________________________________________

THE 
API 
EndPonts
FOR
SEQUILIZE

*/
/* get All Api */
routerSequilize.get("/getStudents", getStudents);

routerSequilize.post("/createStudents", createStudentProfile);

routerSequilize.put("/updatedStudents/:id", updateStudentProfile)

routerSequilize.post("/createProducts", addProducts)

routerSequilize.get("/getAllProducts", getAllProducts);


module.exports = routerSequilize;