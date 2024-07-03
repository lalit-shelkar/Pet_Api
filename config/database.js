
const mongoose = require("mongoose");

//require("dotenv").config();mongodb+srv://rajshelkar24:iu9bifR0iNFE8oaX@cluster0.44anhww.mongodb.net/

const DATABASE_URL = "mongodb+srv://lalit-shelkar:pet1234@atlascluster.qbqfnvg.mongodb.net/";


const dbConnect = ()=>{
    mongoose.connect(DATABASE_URL,{
        useNewurlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{console.log("db connection establish successfully")})
    .catch((error)=>{
        console.log("error occur while db connection"+error);
        process.exit(1);
    });
}

module.exports = dbConnect;