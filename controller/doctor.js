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
      
        if(!firestoreId){
           return res.status(401).json({
                status:"failed",
                message:"firestore id missing",
            });
        }
        
        const tag=tags.split(',');
      //  const img_res= await uploadToCloudinary(doctorImage,"petguardian/doctor");
       const parseAvailableDays= availableDays.split(' ');
       console.log(parseAvailableDays);
       const timeAraay=["10:00 AM","11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM"]
       const arr=[];
       for(let i=0;i<parseAvailableDays.length;i++){
            let arrnew=[];
            arrnew.push(parseAvailableDays[i]);
            arrnew.push(timeAraay);
            arr.push(arrnew);
       }
       console.log(arr);
       
        const response= await Doctor.create({firestoreId, name, experience, rating, img:doctorImage,tags:tag, about, location, qualification,specializes, contact, price, available, availableDays:arr });
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
        }).sort({ _id: -1 });
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

exports.getDoctorById = async(req,res)=>{
    try{
        const doctorId=req.query.doctorId;
        console.log(doctorId);
        const doctor= await Doctor.find({firestoreId:doctorId}).populate({
            path: "patients",
        })
        .exec();
        res.status(200).json({
            status:"sucess",
            data:doctor
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



exports.addDay = async(req,res)=>{
    try{
        const doctorId = req.query.doctorId;
        const day=req.query.day;
       // const doctorImage=req.files.doctorImage;
      
        if(!doctorId || !day){
           return res.status(401).json({
                status:"failed",
                message:"rquired fiels missing",
            });
        }
        
    const doctor= await Doctor.find({firestoreId:doctorId});
    let avd=doctor[0]?.availableDays;
    const timeAraay=["10:00 AM","11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM"]
    let arr=[];
    arr.push(day);
    arr.push(timeAraay);
    avd.push(arr);
    const doctorNewResponse= await Doctor.findOneAndUpdate(
        {firestoreId:doctorId},
        {availableDays:avd},
        {new:true}
    );
        
        return res.status(200).json({
            status:"sucess doctor template creted successfully",
            data:doctorNewResponse
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

exports.removeDay = async(req,res)=>{
    try{
        const doctorId = req.query.doctorId;
        const day=req.query.day;
       // const doctorImage=req.files.doctorImage;
      
        if(!doctorId || !day){
           return res.status(401).json({
                status:"failed",
                message:"rquired fiels missing",
            });
        }
        
    const doctor= await Doctor.find({firestoreId:doctorId});
    let avd=doctor[0]?.availableDays;

    let index=-1;
    for(let i=0;avd.length;i++){
        let inarr=avd[i];
        if(inarr[0]==day){
            index=i;
            break;
        }
    }
  
    
    avd.splice(index, 1);
    



    const doctorNewResponse= await Doctor.findOneAndUpdate(
        {firestoreId:doctorId},
        {availableDays:avd},
        {new:true}
    );
        
        return res.status(200).json({
            status:"sucess doctor template creted successfully",
            data:doctorNewResponse
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