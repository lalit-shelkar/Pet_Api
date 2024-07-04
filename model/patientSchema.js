
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
        appointmentDay:{
            type:Date,
            required:true,
        },
    }
);

module.exports = mongoose.model("patientSchema",patientSchema);