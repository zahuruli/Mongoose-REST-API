const express = require("express");
const mongoose=require('mongoose')
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv=require('dotenv')

const TodosRouter = require("./routes/todos.route");
const UserRouter = require("./routes/users.route");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config()


//Connect to MongoDb:
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1/todos')
.then(()=>{console.log('mongodb connected successfully')})
.catch((err)=>{console.log(err)})


app.use('/todos',TodosRouter)
app.use('/users',UserRouter)


app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/views/index.html");
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found . 404 Error !!!" });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Server Error . 500 Error !!!" });
});

module.exports = app;
