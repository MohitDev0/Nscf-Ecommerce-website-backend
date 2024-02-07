const express = require("express");
const verifyuser = require("../middleware/verifyUser");
const multer = require('multer');
const router = express.Router();
const ProductModel = require("../models/Products");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/productImage')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + ".jpg")
    }
})
const upload = multer({ storage: storage });


// get all product 
router.get("/", async (req, res) => {
    try {
        const AllProducts = await ProductModel.find();
        res.status(200).json(AllProducts);
    } catch (error) {
        res.status(500).json("Error in Product get api");
    }
});


// find product by id

router.get("/productId/:id", async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        res.status(200).json(product)
    } catch (e) {
        res.status(404).json("Product not found");
    }
})

router.post("/uploadProductImg", verifyuser, upload.single("img"), async (req, res) => {
    try {
        res.status(200).json(req.file.path)
    } catch (err) {
        res.status(404).json("Error when upload image");
    }
})

// add new product 
router.post("/addProduct", verifyuser, async (req, res) => {
    try {
        if (req.body.path !== "") {
            req.body.data.img = req.body.path
        }
        const newProduct = await new ProductModel(req.body.data);
        newProduct.save();
        res.status(200).json("Product save successfully");
    } catch (error) {
        res.status(404).json("Error in AddProduct Api");
    }
});

// update product 
router.put("/updateProduct/:id", verifyuser, async (req, res) => {
    try {
        if (req.body.path !== "") {
            req.body.data.img = req.body.path
        }
        const product = await ProductModel.findOneAndUpdate({ _id: req.params.id }, {
            $set: req.body.data
        });
        res.status(200).json("Product update successfully");
        if (!product) {
            res.status(404).json("Product not found");
        }
    } catch (error) {
        res.status(401).json("Error in update Product Api");
    }
})


// delete product 
router.delete("/deleteProduct/:id", verifyuser, async (req, res) => {
    try {
        const product = await ProductModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json("Delete Product successfully");
        if (!product) {
            res.status(404).json("Product not found");
        }
    } catch (error) {
        res.status(404).status("Error in delete Product Api");
    }
})

module.exports = router;