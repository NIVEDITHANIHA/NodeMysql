const express = require('express');
const { getStudents, createStudentProfile, updateStudentProfile } = require('../controller/studentsequilizeController');
const { addProducts, getAllProducts } = require('../controller/productscontroller');
const { registrationAuth, LoginAuth, getStudentLogined, getAllStudents } = require('../controller/Authsequilize');
const { authjwtmiddleware } = require('../middleware/Authjwtmiddleware');
const { emailSend } = require('../controller/Mail/sendmail');
const { getInbox, getAllMail, getSentMail, getDeletedMail } = require('../controller/Mail/allmail');
const routerSequilize = express.Router()

/*______________________________________________________________________________________________________________________________________________________________________________

THE 
API 
EndPonts
FOR
SEQUILIZE

*/
/* API For MODEL BASED PRODUCTS */


routerSequilize.post("/createProducts", addProducts)

routerSequilize.get("/getAllProducts", getAllProducts);


/* API For JWT AUTH */

routerSequilize.post("/student_register", registrationAuth);
routerSequilize.post("/student_login", LoginAuth);

routerSequilize.get("/getLogined_students", authjwtmiddleware, getStudentLogined);
routerSequilize.get("/getallstudents", getAllStudents);


/* get All Api */
routerSequilize.get("/getStudents", getStudents);

routerSequilize.post("/createStudents", createStudentProfile);

routerSequilize.put("/updatedStudents/:id", updateStudentProfile)


/* Api for sending Email */

routerSequilize.post("/sendemail", emailSend);
routerSequilize.get("/inbox", getInbox);
routerSequilize.get("/allmail", getAllMail);
routerSequilize.get("/sentmail", getSentMail);
routerSequilize.get("/deletedmail", getDeletedMail);



module.exports = routerSequilize;