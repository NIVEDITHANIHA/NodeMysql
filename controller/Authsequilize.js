const sequilize = require("sequelize")
const { executeSequelizeQuery } = require("../config/sequilizeconfig")
const jwt = require("jsonwebtoken")

const registrationAuth = async (req, res) => {
    const { id, student_email, password, student_name } = req.body
    try {
        const registrationData = await executeSequelizeQuery(`insert into student_db.student_registation(id, student_email, password, student_name) values (?,?,?,?)`, [id, student_email, password, student_name], {}, sequilize.QueryTypes.INSERT)
        console.log(registrationData);
        if (!registrationData) {
            res.status(406).json({
                success: false,
                message: "Student registration failed",
                data: error
            })
        }
        res.status(200).json({
            success: true,
            message: "Succesfully registerd the student",
            data: req.body
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            data: error
        })
    }
}




const LoginAuth = async (req, res) => {
    const { student_email, password } = req.body
    console.log(student_email, password);

    try {
        const LoginedData = await executeSequelizeQuery(`select * from student_db.student_registation where student_email = ? and password =?`, [req.body.student_email, req.body.password], {}, sequilize.QueryTypes.SELECT)

        console.log(LoginedData);

        if (LoginedData) {
            var token = jwt.sign({ id: LoginedData.id }, 'shhhhh');
            res.status(200).json({
                success: true,
                message: "Succesfully logined the student",
                data: {
                    existed_student: LoginedData.res,
                    token
                }
            })

        } else {

            res.status(406).json({
                success: false,
                message: "Student login failed",
                data: LoginedData.err
            })
        }

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            data: error
        })

    }
}
module.exports = { registrationAuth, LoginAuth }