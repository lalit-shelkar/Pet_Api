
const Product = require("../model/productSchema");
const {uploadToCloudinary}=require("../util/uploadToCloudinary");

exports.createProduct = async(req,res)=>{
    try{
        
        //fetching data from body
        const {name,rating,price,category}=req.body;
        const img=req.files.productImage;

        const Cresponse = await uploadToCloudinary(img,"petguardian/products");
        
        response = await Product.create({name,rating,img:Cresponse.secure_url,price,category});
        res.status(200).json({
            success:true,
            data:response,
            message:'Entry created successfully'
        });
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
           // data:response,
            message:'Entry not created successfully'
        });
    }
}

exports.getProduct = async(req,res)=>{
    try{
        
        //fetching data from body
       // const {name,rating,price,category}=req.body;
        //const img=req.files.productImage;

        const response =await Product.find({});
        
        res.status(200).json({
            success:true,
            data:response,
            message:'Data fetch successfully'
        });
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
           // data:response,
            message:'data is not fetched successfully'
        });
    }
}