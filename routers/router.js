const express = require('express');
const { getStudents, getStudentDetail } = require('../controller/students');
const router = express.Router()
/* get All Api */
router.get("/getStudents",getStudents);

/* get Detail Api */
router.get("/getStudent/:id",getStudentDetail);





module.exports = router