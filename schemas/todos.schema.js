const mongoose=require('mongoose')


const todoSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
    },
    status:{
        type:String,
        enum:["active","inactive"]
    },
    date:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }
})

module.exports=todoSchema;
