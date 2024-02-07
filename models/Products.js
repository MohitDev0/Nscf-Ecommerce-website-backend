const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    desc: {
        type: String,
    },
    available: {
        type: Number,
    },
    img: {
        type: String,
    },
    price:{
        type:Number,
    }
},
    { timestamps: true }
)

const ProductModel = new mongoose.model("Products", ProductSchema);
module.exports = ProductModel;