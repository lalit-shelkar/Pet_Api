const Patient=require("../model/patientSchema");
const Doctor=require("../model/doctorSchema");
exports.createPatient = async(req,res)=>{
    try{
        
    
        const {patientId,doctorId,name,contact,petName,petType,petAge,symptoms,appointmentDay,appointmentTime}=req.body;

        const patientIdString= patientId.toString();
        console.log(patientIdString);
        response = await Patient.create({patientId:patientIdString,name,contact,petName,petType,petAge,symptoms,appointmentDay,appointmentTime});
        const updatedDoctorDetails = await Doctor.findOneAndUpdate(
            {firestoreId:doctorId},
            {$push:{patients:response._id}},
            {new:true}
            ).populate({
				path: "patients",
			})
			.exec();

       await  removeTimeFromSchedule(doctorId,appointmentDay,appointmentTime);
      

       
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
        const doctorId=req.query.doctorId;
        console.log(doctorId);
        const doctor= await Doctor.find({firestoreId:doctorId}).populate({
            path: "patients",
        })
        .exec();
       console.log(doctor);
       const patient=doctor[0]?.patients;

        console.log(patient);
        res.status(200).json({
            status:"sucess",
            data:patient    
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

async function removeTimeFromSchedule(firestoreId, date, time) {
    try {
      const doctor = await Doctor.findOne({ firestoreId });
  
      if (doctor) {
        const availableDays = doctor.availableDays;
  
        for (let i = 0; i < availableDays.length; i++) {
          if (availableDays[i][0] === date) {
            const times = availableDays[i][1];
            const timeIndex = times.indexOf(time);
  
            if (timeIndex > -1) {
              times.splice(timeIndex, 1);
            }
  
            break;
          }
        }
  
        doctor.markModified('availableDays');
        await doctor.save();
        console.log("Time removed successfully");
      } else {
        console.log("Doctor not found");
      }
    } catch (err) {
      console.error('Error removing time:', err);
    }
  }

  exports.changePatientStatus = async(req,res)=>{
    try{
        const {status}=req.body;
        //const response= await Pat
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
