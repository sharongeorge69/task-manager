import mongoose from "mongoose";

const dbConnection = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
    }catch(error){
        console.log("Db error :"+error)
    }
};


export default dbConnection