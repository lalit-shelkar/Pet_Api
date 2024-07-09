const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        firestoreId:{
            type:String,
            required:true,
            unique: true
        },
        name:{
            type:String,
            required:true,
          
        },
        experience:{
            type:String,
            required:true,
         
        },
        qualification:{
            type:String,
            required:true,
           
        },
        rating:{
            type:Number,
            required:true,
            min: 0,
            max: 5
        },
        img:{
            type:String,
            required:true,
        },
        tags:{
            type:[String],
            required:true,
           
        },
        about:{
            type:String,
            required:true,
           
        },
        location:{
            type:String,
            required:true,
        },
        specializes:{
            type:String,
            required:true,
           
        },
        contact:{
            type:Number,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        available:{
            type:String,
            required:true,
        },
        availableDays:{
            type:[String],
            required:true,
        },
        patients:[
            {
                type:mongoose.Schema.Types.ObjectId,
                //required:true,
                ref:"patientSchema"
            }
        ],
    }
);
module.exports = mongoose.model("doctorSchema",doctorSchema);