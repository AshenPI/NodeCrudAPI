const mongoose = require("mongoose");

const productSchema = mongoose.Schema({

        name:{
            type:String , 
            required: true
        },

        quantity: {
            type: Number , 
            required: true ,
            default: 0
        },

        price:{
            type:Number , 
            required: true , 
        },
        
}, {timestamps: true})

const productModel = mongoose.model("API" , productSchema);

module.exports = productModel;

