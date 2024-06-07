const express = require('express');
const { getStudents, getStudentDetail, createStudents, updateStudents, deleteStudents } = require('../controller/students');
const { createDatabase, customersTable, insertCustomer, getCustomerList, customerAgaintsupplier } = require('../controller/customer');
const { addProducts } = require("../controller/productscontroller")
const router = express.Router()

/*______________________________________________________________________________________________________________________________________________________________________________

THE 
API 
EndPonts
FOR
MYSQL RAQ QUERIES

*/
// /* get All Api */
// router.get("/getStudents", getStudents);

/* get Detail Api using query terminology select & clauses  where */
router.get("/getStudent/:id", getStudentDetail);

/* create Api using query terminology insert into   */
router.post("/createStudents", createStudents);

/* Update an Api query terminology upddate */
router.put("/updatedStudents/:id", updateStudents)

/* Delete an Api using query terminology Delete */
router.delete("/deleteStudents/:id", deleteStudents)

/* Create a new Database & a new table  */
router.post("/customer/createTable", createDatabase, customersTable)
/* Create customer using insert into  */
router.post("/create_customers", insertCustomer)
/* get A customer List */
router.get("/getCustomer", getCustomerList)

router.get("/getCustomerAgaintsupplier", customerAgaintsupplier)




/*______________________________________________________________________________________________________________________________________________________________________________

THE 
API 
EndPonts
FOR
SEQUILIZE

*/
router.post("/createProducts", addProducts)
module.exports = router