const express = require("express");
require('dotenv').config()
require("./mongoDB");
const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const ProductRoute = require("./routes/product");
const FeatureRoute = require("./routes/Features");
const CommentRoute = require("./routes/comment");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", ProductRoute);
app.use("/api/feature", FeatureRoute);
app.use("/api/comment", CommentRoute);

// PORT 
app.listen(PORT, () => {
    console.log("Backend Connected", PORT);
})

