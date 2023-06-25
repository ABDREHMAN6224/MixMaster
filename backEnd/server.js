const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/mixmaster').then(()=>{console.log("connection success");})
const app=express()
app.use(bodyParser.urlencoded({extended:true}))

app.post("/cocktail",(req,res)=>{
    res.send("hello")
    console.log(req.body);
})

app.listen(3000,()=>{
    console.log("running");
})