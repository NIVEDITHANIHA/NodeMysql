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


const CreateStudents = async (req, res) => {
  try {
    const { id, name, roll_no, fees, classes, medium } = req.body
    console.log(id, name, roll_no, fees, classes, medium);
    console.log(req.body);
    if (id, name, roll_no, fees, classes, medium) {
      const studentDetail = await db.query(`insert into  student_db.student(id, name, roll_no, fees, classes ,medium) values(?,?,?,?,?,?)`, [id, name, roll_no, fees, classes, medium])
      if (!studentDetail) {
        res.status(404).json(
          {
            success: false,
            message: "Error in Create Students",
            data: err
          }
        )
      }
      res.status(200).json(req.body)

    } else {
      res.status(406).json(
        {
          success: false,
          message: "Error in Create Students",
          data: err
        }
      )
    }
  }
  catch (err) {
    res.status(500).send(
      {
        success: false,
        message: "Error in Create Students",
        data: err
      }

    )
  }



}
module.exports = {
  getStudents,
  getStudentDetail,
  CreateStudents
};
