const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const userSchema=require('../schemas/users.schema')
const userModel=mongoose.model('user',userSchema);


const postUsers=async(req,res)=>{

try {
    const hashedPassword=await bcrypt.hash(req.body.password,10)
    const newUser=new userModel({
        name:req.body.name,
        username:req.body.username,
        password:hashedPassword
    });
    await newUser.save()
    res.status(200).json({message:'User was successfuly registered'})
} catch (error) {
    res.status(400).json({message:'There was a server side error !!!'})

}
}





const getAllUsers=(req,res)=>{
  const users=  userModel.find({},(err,data)=>{
        if(err){
            res.status(400).json({message:'There was a server side error !!! Cant find Data'})
    
        }else{
            res.status(200).json({message:'User Found', Result:data})
    
        }
    }).populate('todos',"title desc -_id")
    
    

}



const deleteAllUsers=(req,res)=>{
    userModel.deleteOne({_id:req.params.id},(err)=>{
        if(err){
            res.status(400).json({message:'There was a server side error !!! Cant find Data'})
    
        }else{
            res.status(200).json({message:'User deleted succesfuly'})
    
        }
    })
    }
    



const logedin=async (req,res)=>{

    try {
        const user=await userModel.find({username:req.body.username})
        if(user && user.length>0){
            const isValidPassword=await bcrypt.compare(req.body.password, user[0].password)
            
            if(isValidPassword){
                const token=jwt.sign({
                    username:user[0].username,
                    userId:user[0]._id
                },process.env.JWT_SECRET,{expiresIn:"2h"})

                res.status(200).json({
                    "message":"Log in Successful",
                    "access-token":token
                })

            }else{
                res.status(401).json({message:'!!! Authentication fail'})

            }

        }else{
            res.status(401).json({message:'!!! Authentication fail'})

        }


        
    } catch (error) {
     res.status(401).json({message:'!!! Authentication fail'})

    }

}




module.exports={postUsers,getAllUsers,deleteAllUsers,logedin}