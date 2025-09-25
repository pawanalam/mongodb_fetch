
// mongodb connection 
const mongoose = require("mongoose");

let mongooseF =()=>{

    mongoose.connect("mongodb://localhost:27017/users").then(()=>{
    console.log("connected with your's database....");
   }).catch(()=>{
    console.log("not connect....");
   })

   let mongooseSch = mongoose.Schema({

    name:{
        type:String,
    },

    phone:{
        type:String,
    },

    email:{
        type:String,
    },

    password:{
        type:String,

    },

    cpassword:{
        type:String,
    }

   });

   let mongooseMdl = mongoose.model("user",mongooseSch);

   module.exports=mongooseMdl;

}
mongooseF();