const Patient=require("../model/patientSchema");
const Doctor=require("../model/doctorSchema");
exports.createPatient = async(req,res)=>{
    try{
        
    
        const {name,patientId,appointmentDay,doctorId}=req.body;

        const patientIdString= patientId.toString();
        console.log(patientIdString);
        response = await Patient.create({name,patientId,appointmentDay});
        const updatedDoctorDetails = await Doctor.findOneAndUpdate(
            {firestoreId:doctorId},
            {$push:{patients:response._id}},
            {new:true}
            ).populate({
				path: "patients",
			})
			.exec();

       
        res.status(200).json({
            success:true,
            data:response,
            message:'Appointment booked for patient'
        });
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
           data:response,
            message:'Entry not created successfully'
        });
    }
}

exports.getPatient = async(req,res)=>{
    try{
        const response= await Patient.find({});
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

/*exports.isPatientExist = async (req,res)=>{
    try{
        const { firestoreId ,} = req.body;
        if(!firestoreId){
            res.status(500).json({
                status:"failed",
                message:"firestore id missing",
            });
        }

        const exist= await Patient.findOne({firestoreId});
        if(exist){
            res.status(400).json({
                status:"success",
                message:"patient already booked his appointment",
                flag:true
            });
        }else{
            res.status(200).json({
                message:"doctor alerdy created his template",
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
}*/
