const db = require("../config/db");
/* Functionality For get APi */
const getStudents = async (req, res) => {
  try {
    const getData = await db.query("select * from student");
    // console.log("getData".bgWhite.red,getData);
    // console.log("getData".bgGreen.white,getData[0]);

    if (getData) {
      res.status(200).send({
        success: true,
        message: "Students List",
        totalLength: getData[0].length,
        data: getData[0],
      });
    } else {
      res.status(406).send({
        success: false,
        message: "No students are founded",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in students",
      err,
    });
  }
};



/* Functionality For Detail APi */
const getStudentDetail = async (req, res) => {

  const student_id = req.params.id
  console.log("getData".bgWhite.red, req.params.id);

  try {
    if (student_id) {
      const studentDetail = await db.query(`select * from student where id = ${student_id}`)
      console.log("getData".bgWhite.red, studentDetail);
      if (studentDetail[0].length > 0) {
        res.status(200).send(
          {
            success: true,
            message: "studentDetails",
            totalLength: studentDetail[0].length,
            data: studentDetail[0]
          }

        )
      }
      else {
        res.status(404).send(
          {
            success: false,
            message: "No studentDetails",

          }

        )

      }

    }
    else {
      res.status(406).send(
        {
          success: false,
          message: "No studentDetails",

        }

      )

    }
  }
  catch (err) {
    res.status(500).send(
      {
        success: false,
        message: "Error in studentDetails",
        data: err
      }

    )
  }


}
module.exports = {
  getStudents,
  getStudentDetail
};
