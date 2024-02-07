const express = require("express");
const router = express.Router();

const ProductModel = require("../models/Products");



router.post("/uploadImage", upload.single('productImage'), async (req, res) => {

    console.log(req.file);

})