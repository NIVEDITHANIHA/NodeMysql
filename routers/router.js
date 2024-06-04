const express = require('express');
const { getStudents, getStudentDetail, CreateStudents } = require('../controller/students');
const router = express.Router()
/* get All Api */
router.get("/getStudents",getStudents);

/* get Detail Api */
router.get("/getStudent/:id",getStudentDetail);


router.post("/createStudents",CreateStudents)


module.exports = router