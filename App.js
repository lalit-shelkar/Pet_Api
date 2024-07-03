const express = require("express");
const upload = require("express-fileupload");
const app=express();
app.use(express.json());
app.use(upload({
    useTempFiles : true,
    tempFileDir : '/temp/',
}));

const {createProduct} = require("./controller/product");
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

app.get("/doctorData",(req,res)=>{
    
     res.send(doctorData);
 });

 app.post("/doctorData",(req,res)=>{
   
    doctorData.push(req.body);

    res.status(200).send("Doctor data received successfully");
});

app.listen(port,()=>{
    console.log("App is running")
})
