import mongoose, { Schema } from "mongoose";

const hiringformSchema = new Schema({
  title: {
    type : String,
    required : true,
    unique : false
  },
  fields: {
    type: Schema.Types.Mixed, // Allows for dynamic field types
    unique : false,
    default: {}
}
},{strict: false , timestamps: true})

export const Hire = mongoose.model("Hire",hiringformSchema)