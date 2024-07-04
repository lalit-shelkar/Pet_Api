const Patient=require("../model/patientSchema");

exports.createPatient = async(req,res)=>{
    try{
        
        //fetching data from body
        const {name,patientId,appointmentDay}=req.body;
        const parsedAppointmentDay = JSON.parse(appointmentDay);

        
        response = await Patient.create({name,patientId,appointmentDay:parsedAppointmentDay});
       
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
           // data:response,
            message:'Entry not created successfully'
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
