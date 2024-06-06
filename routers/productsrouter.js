const express = require("express")
const router = express.Router();

const { addProducts } = require("../controller/productscontroller")

router.post("/createProducts",addProducts)