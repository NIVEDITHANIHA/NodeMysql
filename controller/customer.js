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

const customersTable = async (req, res,) => {
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
            data: req.body
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

const getCustomerList = async (req, res) => {
    try {
        const getCustomers = await db.query("select * from customers.needbased_customer group by customers.needbased_customer.customer_name order by customers.needbased_customer.customer_name asc ")
        res.status(200).json({
            success: true,
            message: "Succesfyully created customer List",
            data: getCustomers[0]
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "No Customer Found",
            data: error
        })

    }

}


const customerAgaintsupplier = async (req, res) => {
    try {

        const againstCustomer = await db.query(`select * from customers.needbased_customer right join customers.supplier on customers.needbased_customer.id = customers.supplier.against_customer_id`)

        res.status(200).json({
            success: true,
            message: " Against Customer Found",
            data: againstCustomer[0]
        })



    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: "No Against Found",
            data: error
        })
    }
}


module.exports = { createDatabase, customersTable, insertCustomer, getCustomerList, customerAgaintsupplier }