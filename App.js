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
    console.log("Received doctor data:");
    console.log(req.body); // Assuming req.body is parsed JSON data

    // Example: Store data in an array (you should use a database in production)
    doctorData.push(req.body);

    res.status(200).send("Doctor data received successfully");
});

app.listen(port,()=>{
    console.log("App is running")
})
