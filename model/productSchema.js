
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            maxLength:15
        },
        rating:{
            type:Number,
            required:true,
        },
        img:{
            type:String,
            required:true,
        },
        category:{
            type:String,
            required:true,
        },
    }
);

module.exports = mongoose.model("Product",productSchema);