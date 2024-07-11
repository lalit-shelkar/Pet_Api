
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        patientId:{
            type:String,
            required:true,
        },
        name:{
            type:String,
            required:true,
        },
        contact:{
            type:String,
            required:true,
        },
        petName:{
            type:String,
            required:true,
        },
        petType:{
            type:String,
            required:true,
        },
        petAge:{
            type:Number,
            required:true,
        },
        symptoms:{
            type:String,
            required:true,
        },
        appointmentDay:{
            type:String,
            required:true,
        },
        appointmentTime:{
            type:String,
            require:true
        },
        status:{
            type:String,
            default:"pending"
        }
    }
);

module.exports = mongoose.model("patientSchema",patientSchema);