const db = require("../config/db")
/* Create an Database */

const createDatabase = async (req, res, next) => {

    try {
        const existedCustomer = await db.query(`create database customers`)
        console.log(existedCustomer);
        res.status(200).json({
            success: true,
            message: "created customers",
        })
        next();
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "customer creation failed",
            data: err

        })
    }

}

const customersTable = async (req, res, ) => {
    try {
        const createTable = await db.query(`
            CREATE TABLE customers.needbased_customer (
                id INT AUTO_INCREMENT,
                customer_name VARCHAR(50),
                age INT,
                needs VARCHAR(150),
                total_amount int,
                PRIMARY KEY (id)
            )
        `);

        res.status(200).json({
            success: true,
            message: "Customer table created",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Customer table creation failed",
            data: error
        });
    }
};

const insertCustomer = async (req, res) => {
    const { id, customer_name, age, needs, total_amount } = req.body
    try {
        const insertvalues = await db.query(`insert into customers.needbased_customer (id ,customer_name ,age , needs ,total_amount) values(?,?,?,? ,?)`, [id, customer_name, age, needs, total_amount])
        res.status(200).json({
            success: true,
            message: "Customer table created",
            data : req.body
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "cannot Insert Values to the customers",
            data: err
        });
    }

}


module.exports = { createDatabase, customersTable, insertCustomer }