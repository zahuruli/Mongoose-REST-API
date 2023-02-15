const mongoose=require('mongoose')
const todoSchema=require('../schemas/todos.schema')
const TodosModel= mongoose.model('todo',todoSchema)
const userSchema=require('../schemas/users.schema')
const userModel=mongoose.model('user',userSchema);



//get todos-------------->
const getTodos = (req, res) => {

    TodosModel.find({},(err,data)=>{

        if(err){
            res.status(500).json({message:'there was a server side error '})
        }else{
            res.status(200).json({message:'Successfully found todos',result:data})

        }

    }).populate("user","name username -_id")
}

//get todos byId-------------->

const getTodoById = (req, res) => {
const id=req.params.id;

TodosModel.find({_id:id},(err,data)=>{
        if(err){
            res.status(500).json({message:'there was a server side error '})
        }else{
            res.status(200).json({message:'Successfully found todos',result:data})
            
        }

}).populate("todos","")

};

//post todos-------------->
const postTodos = async(req, res) => {
const newTodo=new TodosModel({...req.body,user:req.userId});
try {
    const postedTodo=await newTodo.save()
   await userModel.updateOne({_id:req.userId},{$push:{todos:postedTodo._id}})
    res.status(200).json({message:'Todo was inserted successfully '})
} catch (error) {
    res.status(500).json({message:'there was a server side error '})

}
};

//post All the todos-------------->

const postAllTodos = (req, res) => {
const creatTodo=req.body;
TodosModel.insertMany((creatTodo),(err)=>{
    if(err){
        res.status(500).json({message:'there was a server side error '})
    }else{
        res.status(200).json({message:'Todo was  successfully inserted'})

    }
})
};

//find by id & update todos :

const updateTodos = (req, res) => {
const id=req.params.id;
TodosModel.updateOne({_id:id},{$set:{title:req.body.title,desc:req.body.desc,active:req.body.active}},(err)=>{
    if(err){
        res.status(500).json({message:'there was a server side error '})
    }else{
        res.status(200).json({message:'Todo was  successfully Updated'})

    }

})

};
    
//Delete todos :

const DeleteTodos = (req, res) => {
    const id=req.params.id;
    TodosModel.deleteOne({_id:id},(err)=>{
        if(err){
            res.status(500).json({message:'there was a server side error '})
        }else{
            res.status(200).json({message:'Todo was  successfully Deleted'})
    
        }
    
    })
    
    };
    





module.exports = { getTodos,getTodoById,postTodos ,postAllTodos,updateTodos,DeleteTodos };
