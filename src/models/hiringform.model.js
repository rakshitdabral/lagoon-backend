import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const hiringformSchema = new Schema({
  uniqueKey: {
    type: String,
    required: true,
    unique: true,
    default: () => uuidv4()
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'trashed'],
    default: 'draft',
  },
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