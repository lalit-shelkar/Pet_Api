const express = require("express");
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
    data.append({"name":"new name"})
});

app.listen(port,()=>{
    console.log("App is running")
})
