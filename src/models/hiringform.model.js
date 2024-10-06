import mongoose, { Mongoose, Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';


const dynamicFields = new Schema({
  fields : [
    {
      question_type : {
        type : String,
        default : "text"
      },
      regex : {
        type : String
      },
      char_limit :{
        type : Number
      },
      subtype : {
       type: String,
       enum : ["plain","email"]
      },
      required : {
        type : Boolean
      },
      placeholder : {
        type : String,
        default : ""
      },
      question : {
        type : String,
      }
    },
    {
      question_type : {
        type : String,
        default : "options"
      },
      subtype : {
        type : String,
        enum : ["checkbox","radio","dropdown"]
      },
      required : {
        type : Boolean
      },
      options : [
        {
          label : {
            type : String
          },
          value : {
            type : String
          }
        }
      ]
    },{
      question_type : {
        type : String,
        default : Number
      },
      min : {
        type :Number,
        default : 0
      },
      max : {
        type : Number,
        default : 20
      },
      subtype : {
        type : String,
        enum : ["integer" ,"decimal"]
      },
      placeholder : {
        type : String,
        default : ""
      },
      question : {
        type : String
      },
      required : {
        type : Boolean
      }
    },
    {
      question_type : {
        type : String,
        default : "file"
      },
      minSize : {
        type : Number,
        default : 1024
      },
      maxSize : {
        type : Number,
        default : 10000
      },
      subtype : {
        type : String,
        enum : ["image","video","doc","audio"]
      },
      accept : ['image/jpg','doc/pdf'],
      question : {
        type : String
      },
      required : {
        type : Boolean,
      }
    },
    
  ]
},{strict : false})

const hiringformSchema = new Schema({
  uniqueKey: {
    type: String,
    required: true,
    unique: true,
    default: () => uuidv4()
  },
  
  title: {
    type : String,
    required : true,
    unique : false
  },status: {
    type: String,
    enum: ['draft', 'published', 'trashed'],
    default: 'draft',
  },
  // created_by:{
  //   type : mongoose.Schema.Types.ObjectId,
  //   ref : 'User',
  //   required : true
  // },
  fields: [dynamicFields],
},{strict: false , timestamps: true})

export const Hire = mongoose.model("Hire",hiringformSchema)