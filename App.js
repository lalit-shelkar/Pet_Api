const express = require("express");
const upload = require("express-fileupload");
const app=express();
app.use(express.json());
app.use(upload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
}));

const {createProduct, getProduct} = require("./controller/product");
const {createDoctor, getDoctor} = require("./controller/doctor");

const port=3000;
const doctorData=require("./resources/doctorData");


//connect to database
const dbConnect = require("./config/database");
dbConnect();

const cloudinaryConnect = require("./config/cloudinary");//to store at media server
cloudinaryConnect.cloudinaryConnect();

app.get("/",(req,res)=>{
    res.send("Welcome to pet care App v2");
});
app.post("/createProduct",createProduct);
app.post("/createDoctor",createDoctor);

app.get("/getProduct",getProduct);
app.get("/getDoctor",getDoctor);


app.listen(port,()=>{
    console.log("App is running")
})
