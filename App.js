const express = require("express");
//const bodyParser = require('body-parser');
//app.use(bodyParser.json());
const app=express();
const port=3000;
const doctorData=require("./resources/doctorData");
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Welcome to pet care App");
});

app.get("/doctorData",(req,res)=>{
     res.send(doctorData);
 });

 app.post("/doctorData",(req,res)=>{
    console.log("workin !!!");
    res.status(200).json({
        message:"workingg"
    })
});

app.listen(port,()=>{
    console.log("App is running")
})
