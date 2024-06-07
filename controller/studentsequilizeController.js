const {sequelizeDb} = require("../models/index");
const sequelize = require("sequelize");


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
    const getData = await executeSequelizeQuery("select * from student order by student_db.student.name desc" ,{} ,{} ,sequelize.QueryTypes.SELECT).then((getstudentsresponses)=>{
      console.log("getstudentsresponses.res",getstudentsresponses);
      if(getstudentsresponses.res){
        res.status(200).send({
          success: true,
          message: "Students List",
          totalLength: getstudentsresponses.res.length,
          data: getstudentsresponses.res,
        });
      }else{
        res.status(406).send({
          success: false,
          message: "No students are founded",
          data:getstudentsresponses.err
        });
      }

    })
   
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in students",
      err,
    });
  }
};


module.exports = {getStudents}