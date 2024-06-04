const express = require('express');
const { getStudents, getStudentDetail, createStudents ,updateStudents ,deleteStudents } = require('../controller/students');
const { createDatabase } = require('../controller/customer');
const router = express.Router()
/* get All Api */
router.get("/getStudents",getStudents);

/* get Detail Api */
router.get("/getStudent/:id",getStudentDetail);

/* create Api  */
router.post("/createStudents",createStudents);

/* Update an Api */
router.put("/updatedStudents/:id",updateStudents)

/* Delete an Api */
router.delete("/deleteStudents/:id",deleteStudents)

/* Create a new Database */
router.post("/customer",createDatabase)


module.exports = router