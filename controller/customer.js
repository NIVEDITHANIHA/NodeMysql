const db = require("../config/db")
/* Create an Database */

const createDatabase = async (req,res)=>{

    try{
        const existedCustomer = await db.query(`create database customers`)
        console.log(existedCustomer);
        res.status(200).json({
            success : true,
            message : "created customers",

        })

    }
    catch(err){
        res.status(500).json({
            success : false,
            message : "customer creation failed",
            data :err

        })
    }

}




module.exports = {createDatabase}