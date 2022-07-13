const mongoose=require('mongoose');

async function connect(){
    try{
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Connect to mongo success");
    } catch(error){
        console.log("Connect to mongo failed:", error);
    }
    
}

module.exports={connect};

