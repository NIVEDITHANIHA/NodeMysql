const { dbModelSequilize } = require("../config/sequilizeconfig");

const product = dbModelSequilize.products
// console.log("dbModelSequilize",dbModelSequilize);

const addProducts = async (req, res) => {
    const { title, price, description, published } = req.body
    console.log(req.body);
    const productCreated = await product.create(req.body)
    res.status(200).json({
        success:true,
        message:"Succesfully Created Products",
        data : req.body
    })
}

const getAllProducts = async (req,res)=>{
    const getProducts = await product.findAll()
    res.status(200).json({
        success:true,
        message:"Products List",
        data : getProducts
    })

}
module.exports = { addProducts ,getAllProducts}

