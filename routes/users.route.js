const express=require('express');
const { postUsers, getAllUsers, logedin, deleteAllUsers } = require('../controllers/users.controller');
const Router=express.Router();

Router.post('/register',postUsers)
Router.get('/',getAllUsers)
Router.delete('/:id',deleteAllUsers)
Router.post('/login',logedin)

module.exports=Router;