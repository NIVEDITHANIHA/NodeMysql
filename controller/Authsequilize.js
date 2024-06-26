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
        if (LoginedData) {
            console.log(LoginedData.res[0].id);
            const token = jwt.sign({ id: LoginedData.res[0].id }, 'superuserToken');
            console.log("token", token);
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

const getStudentLogined = (req, res) => {
    const id = req.payload
    console.log(id);

    new Promise((resolve, reject) => {
        executeSequelizeQuery("select * from student_db.student_registation where id=?", [id], {}, sequilize.QueryTypes.SELECT)
            .then(result => resolve(result))
            .catch(err => reject(err));

    }).then((getloginedStudent) => {
        console.log("getloginedStudent.res", getloginedStudent.res);
        if (getloginedStudent.res) {
            res.status(200).send({
                success: true,
                message: "Students List",
                totalLength: getloginedStudent.res.length,
                data: getloginedStudent.res,
            });
        } else {
            res.status(406).send({
                success: false,
                message: "No students are founded",
                data: getloginedStudent.err
            });
        }

    }).catch((err) => {
        res.status(500).send({
            success: false,
            message: "Error in students",
            err,
        });
    })

};

const getAllStudents = (req, res) => {

    const getData = executeSequelizeQuery(`select *  from student_db.student left outer join student_db.student_registation using (id) left outer join student_db.products using (id)`, {}, {}, sequilize.QueryTypes.SELECT).then((getResponse) => {
        // console.log(getResponse);
        res.status(200).json({
            success: true,
            message: "All students Details Listed:",
            data: getResponse.res
        })

    }).catch((err) => {
        res.status(500).json({
            success: true,
            message: "Server Error:",
            data: err
        })
    })

}










module.exports = { registrationAuth, LoginAuth, getStudentLogined, getAllStudents }