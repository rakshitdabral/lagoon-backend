import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullname:{
      type:String,
    },
    email:{
      type:String,
    },
    profile : {
      companyName : {
        type : String
      },
      role : {
        type : String,
        enum : ['candidate' , 'recuriter'],
        default : "recuriter"
      }
    },
    industry : {
      type : String
    }
} , {timestamps : true})

export const User = mongoose.model("User",userSchema)