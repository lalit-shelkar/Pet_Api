const Doctor=require("../model/doctorSchema");
const {uploadToCloudinary}=require("../util/uploadToCloudinary");
//controller for create doctor details


exports.isDoctorExist = async (req,res)=>{
    try{
        const { firestoreId } = req.body;
        if(!firestoreId){
            res.status(500).json({
                status:"failed",
                message:"firestore id missing",
            });
        }
        console.log("this is fire",firestoreId,typeof(firestoreId));
        const exist= await Doctor.findOne({firestoreId});
        console.log("exist ",typeof(exist),exist);
        if(exist){
            console.log("exist");
            res.status(400).json({
                message:"doctor alerdy created his template",
                flag:true
            });
        }else{
            console.log("not");
            res.status(200).json({
                message:"doctor not alerdy created his template",
                flag:false
            });
        }

    }catch(err){
        console.error(err);
        res.status(500).json({
            status:"failed",
            message:"INTERNAL SERVER ERROR",
            response:err,
        });
    }
}

exports.createDoctor = async(req,res)=>{
    try{
        const { firestoreId, name, experience, rating, tags, about,doctorImage, location, specializes, contact, price, available, availableDays ,qualification} = req.body;
       // const doctorImage=req.files.doctorImage;
       console.log(req.body);
       console.log(req.body.firestoreId,contact,price);
        if(!firestoreId){
           return res.status(401).json({
                status:"failed",
                message:"firestore id missing",
            });
        }
        
        const tag=tags.split(',');
      //  const img_res= await uploadToCloudinary(doctorImage,"petguardian/doctor");
       const parseAvailableDays= availableDays.split(' ');
        const response= await Doctor.create({firestoreId, name, experience, rating, img:doctorImage,tags:tag, about, location, qualification,specializes, contact, price, available, availableDays });
        return res.status(200).json({
            status:"sucess doctor template creted successfully",
            data:response
        });

    }catch(err){
        console.error(err);
       return  res.status(400).json({
            status:"failedd",
            message:"INTERNAL SERVER ERROR",
            response:err,
        });
    }
}

exports.getDoctor = async(req,res)=>{
    try{
        const response= await Doctor.find({}).populate({
            path:"patients"
        });
        res.status(200).json({
            status:"sucess",
            data:response
        });

    }catch(err){
        console.error(err);
        res.status(500).json({
            status:"failed",
            message:"INTERNAL SERVER ERROR",
            response:err,
        });
    }
}