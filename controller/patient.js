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
        const patient=doctor[0]?.patients
        let s=[];
        s=patient.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
        console.log(patient);
        res.status(200).json({
            status:"sucess",
            data:s
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

//   exports.changePatientStatus = async(req,res)=>{
//     try{
//         const {status}=req.body;
//         //const response= await Pat
//         res.status(200).json({
//             status:"sucess",
//             data:response
//         });

//     }catch(err){
//         console.error(err);
//         res.status(500).json({
//             status:"failed",
//             message:"INTERNAL SERVER ERROR",
//             response:err,
//         });
//     }
// }

exports.changeStatus = async(req,res)=>{
    try{
        const patientId=req.query.patientId;
        //console.log(doctorId);
        const patient= await Patient.findOneAndUpdate(
            {firestoreId:patientId},
            {status:"confirmed"}
        );
        console.log(patient);
        res.status(200).json({
            status:"sucess"
         });

    }catch(err){
        console.error(err);
        res.status(500).json({
            status:"failed",
            message:err,
            response:err,
        });
    }
}
