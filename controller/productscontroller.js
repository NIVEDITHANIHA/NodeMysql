const db = require("../models");

const product = db.products

const addProducts = async (req, res) => {
    const { title, price, description, published } = req.body
    console.log(req.body);
    const productCreated = await product.create(req.body)
    res.status(200).json(productCreated)
}


module.exports = { addProducts }

