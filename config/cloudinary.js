const cloudinary = require("cloudinary");

exports.cloudinaryConnect = ()=>{

    CLOUD_NAME="dstxrkjmm";
    API_KEY=497586915996264;
    API_SECRET="ZX5Sk7AeaHiIKr1dqJsK8ZdgvXA";
    try{
        cloudinary.config({
            cloud_name:CLOUD_NAME,//dstxrkjmm
            api_key:API_KEY,//497586915996264
            api_secret:API_SECRET,//ZX5Sk7AeaHiIKr1dqJsK8ZdgvXA
        })
        console.log("clodinary connected succesgully");
    }catch(err){
        console.log(err);
        console.log("clodinary connection issues")
    }
}
