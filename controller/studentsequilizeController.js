const sequelize = require("sequelize");
const { sequelizeDb } = require("../config/sequilizeconfig");


const executeSequelizeQuery = async (query, params, customParams, type) => {
  console.log(query, params, customParams, type);
  try {
    const result = await sequelizeDb.query(query, { replacements: params, type: type });
    console.log(result);
    return { err: null, res: result };
  } catch (error) {
    return { err: error, res: null };
  }
};




/* Functionality For get APi */
const getStudents = async (req, res) => {
  try {
    const getstudentsresponses = await executeSequelizeQuery("select * from student order by student_db.student.name desc", {}, {}, sequelize.QueryTypes.SELECT)
      // console.log("getstudentsresponses.res", getstudentsresponses);
      if (getstudentsresponses.res) {
        res.status(200).send({
          success: true,
          message: "Students List",
          totalLength: getstudentsresponses.res.length,
          data: getstudentsresponses.res,
        });
      } else {
        res.status(406).send({
          success: false,
          message: "No students are founded",
          data: getstudentsresponses.err
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

const createStudentProfile = async (req, res) => {
  const { id, name, roll_no, fees, classes, medium } = req.body;
  try {
    const studentCreateProfile = await executeSequelizeQuery(
      `INSERT INTO student_db.student (id, name, roll_no, fees, classes, medium) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, name, roll_no, fees, classes, medium],
      {},
      sequelize.QueryTypes.INSERT
    );

    console.log(studentCreateProfile);

    if (studentCreateProfile.res) {
      res.status(200).send({
        success: true,
        message: "Student Created",
        data: req.body,
      });
    } else {
      res.status(406).json({
        success: false,
        message: "Error in Creating Student",
        data: studentCreateProfile.err,
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in Creating Student",
      data: err,
    });
  }
};

const updateStudentProfile = async (req, res) => {
  const { id, name, roll_no, fees, classes, medium } = req.body;

  try {
    const updateStudentsId = req.params.id;
    // console.log("updateStudentsId".bgCyan.white, updateStudentsId);
    if (updateStudentsId) {
      const data =  await executeSequelizeQuery(
        `UPDATE student_db.student 
      SET name = ?, roll_no = ?, fees = ?, classes = ?, medium = ? 
      WHERE id = ?`,
        [name, roll_no, fees, classes, medium, updateStudentsId]
      );
      res.status(200).json({
        success: true,
        message: "Student Details updated",
        data: { name, roll_no, fees, classes, medium, id, updateStudentsId },
      });
      if (!data) {
        res.status(406).json({
          success: false,
          message: "Invalid Id",
          data: err,
        });
      }
    } else {
      res.status(406).json({
        success: false,
        message: "Student cannot be updated",
        data: err,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Student cannot be updated",
      data: err,
    });
  }
};


module.exports = { getStudents ,createStudentProfile , updateStudentProfile}