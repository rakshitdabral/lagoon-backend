import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const dynamicFields = new Schema({
  fields : [
    {
      question_type : {
        type : String,
        default : "text",
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

const settingsSchema = new Schema({
  maxSubmissionsPerUser: {
    type: Number,
    default: 1, // Maximum number of form submissions per user
  },
  allowPartialResponses: {
    type: Boolean,
    default: false, // Toggle for allowing partial responses
  },
  limitTotalSubmissions: {
    type: Boolean,
    default: false, // Toggle for limiting total number of submissions
  },
  totalSubmissionsLimit: {
    type: Number,
    default: null, // Limit total submissions when limitTotalSubmissions is true
  },
  emailCopyToApplicant: {
    type: Boolean,
    default: false, // Toggle for sending email copy to the applicant
  },
  showProgressBar: {
    type: Boolean,
    default: false, // Toggle for showing progress bar
  },
  deadline: {
    type: Date, // Date for form submission deadline
    default: null,
  },
  exportToGoogleSheets: {
    type: Boolean,
    default: false, // Toggle for exporting responses to Google Sheets
  },
  closeForm: {
    type: Boolean,
    default: false, // Toggle for closing the form
  },
  sendEmailNotifications: {
    type: Boolean,
    default: false, // Toggle for sending email notifications
  },
}, { _id: false , default : true});

const hiringformSchema = new Schema({
  uniqueKey: {
    type: String,
    required: true,
    unique: true,
    default: () => uuidv4(),
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'trashed'],
    default: 'draft',
  },
  description: {
    type: String,
  },
  salary: {
    type: Number,
  },
  mode: {
    type: String,
    enum: ['hybrid', 'work-from-home', 'in-office'],
  },
  nature: {
    type: String,
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
  },
  fields: [dynamicFields],
  settings: {settingsSchema}, // Add the settings sub-schema here
}, { strict: false, timestamps: true });

export const Hire = mongoose.model("Hire",hiringformSchema)