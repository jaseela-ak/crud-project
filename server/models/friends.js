const mongoose=require("mongoose");

const friendSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:false,
    },

})
const friendModel=mongoose.model("friends",friendSchema);
module.exports=friendModel;