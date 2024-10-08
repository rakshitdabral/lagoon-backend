import mongoose, { Schema } from "mongoose";


const templateAnalytic = new Schema({
  counter : {
    type : Number,
    default : 0
  }
})

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

const templateSchema = new Schema({
  templateName: {
    type : String,
    required : true,
    unique : false
  },description: {
    type: String,
  },
  description : {
    type :String
  },
  usageCount  : templateAnalytic,
  fields: [dynamicFields],
},{strict: false , timestamps: true})

export const Template = mongoose.model("Template",templateSchema)