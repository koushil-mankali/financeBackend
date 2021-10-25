const path = require("path");

const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require('cors');


const homeRoute = require("./routes/home");
const bussinessRoute = require("./routes/bussinessProfile");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const loanRoute = require("./routes/loan");
const transRoute = require("./routes/transactions");
const investmentRoute = require("./routes/investment");
const collectionAgentRoute = require("./routes/collectionAgents");

const app = express();
app.use(cors());

const fileStorage =multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg"){
    cb(null, true);
  }else{
    cb(null, false);
  }
}

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")))
app.use(multer({storage: fileStorage ,fileFilter: fileFilter}).single('image'))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Method", "POST, GET, PUT, PATCH, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Origin, Authorization"
    );
    next();
  });

app.use(homeRoute);  
app.use(bussinessRoute);  
app.use(authRoute);  
app.use(userRoute);  
app.use(loanRoute);  
app.use(transRoute);  
app.use(investmentRoute);  
app.use(collectionAgentRoute);  

app.use( (error,req, res, next) => {
let errorstatus = error.statuscode || 500;
res.status(errorstatus).json({message: error._message ? error._message : error.message, errors: error.errors})
next()
})
  
mongoose.connect('mongodb+srv://sample:sample123@cluster0.xb5wo.mongodb.net/finance?retryWrites=true&w=majority', {  serverSelectionTimeoutMS: 5000})
.then( () => {
    app.listen(3000)
    console.log("connected");
})
.catch(err => { 
  console.log("Connection Err", err)
});