const express = require("express");
const router = express.Router();
const Features = require("../models/Features");
// const verifyUser = require("../middleware/verifyUser");

// get features 
router.get("/", async (req, res) => {
    try {
        const features = await Features.find();
        res.status(200).json(features);
    } catch (error) {
        res.status(400).json("Error in get all features api");

    }

});

// add features 
router.post("/add", async (req, res) => {
    try {
        const features = await new Features(req.body);
        features.save();
        res.status(200).json("feature add sucessfully");
    } catch (error) {
        res.status(400).json("Error in features api");
    }

});

// update features 
router.put("/update/:featureId", async (req, res) => {
    try {
        await Features.findOneAndUpdate({ _id: req.params.featureId }, {
            $set: req.body,
        })
        res.status(200).json("update feature successfully");
    } catch (error) {
        res.status(400).json("Error in feature api");
    }

});



// delete features 
router.delete("/delete/:featureId", async (req, res) => {
    try {
        await Features.findOneAndDelete({ _id: req.params.featureId });
        res.status(200).json("Feature deleted successfully");
    } catch (error) {
        res.status(400).json("Error in feature api");
    }
});


module.exports = router;
