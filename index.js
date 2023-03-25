const express = require("express");
const app = express();
const mongoose = require("mongoose");
const prodModel = require("./models/productModel");
require("dotenv").config();

app.use(express.json());

//routes
app.get("/" , async (req , res) =>{
 res.send(await  prodModel.find());
})


app.post("/product" , async  (req  , res) =>{
   try {
 
    const newProd = new prodModel(req.body);

    const savedprod = await newProd.save();

   

    return res.send(savedprod)

    

   } catch (error) {
    return res.status(404).json(error);

   }
})

app.get("/products/:id" , async(req , res) =>{
    try {
        const {id} = req.params
        const prod = await prodModel.findById(id);
        res.status(200).json(prod)

    } catch (error) {
        return res.status(404).json(error);
    }
})

app.put("/products/:id" , async (req , res) =>{
    try {
        const {id} = req.params;
        const prod = await prodModel.findByIdAndUpdate(id , req.body)
        res.status(200).json(prod)
    } catch (error) {
        return res.status(404).json(error)
    }
})

app.delete("/products/:id" , async (req , res) =>{
    try {
        const {id} = req.params;
        const prod = await prodModel.findByIdAndDelete(id)
        res.status(200).json(prod)

    } catch (error) {
    res.status(404).json(error)
    }
})
//db connection 

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log("connected to the database")
}).catch((err)=>{
    console.log(err)
})


app.listen(process.env.PORT , (req , res) =>{

console.log("listeining on port " + process.env.PORT)
})