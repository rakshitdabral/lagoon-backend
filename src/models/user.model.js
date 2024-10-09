import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new Schema({
  uniqueUserKey: {
    type: String,
    required: true,
    unique: true,
    default: () => uuidv4(), 
  },
  username: {
    type: String,
    unique: true,
    sparse: true, // Keep this if you want to allow null values for username
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'], 
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  googleId: { 
    type: String,
    unique: true,
    sparse: true, // Keep this if you want to allow null values for googleId
  },
  linkedinId: { 
    type: String,
    unique: true,
    sparse: true, // Keep this if you want to allow null values for linkedinId
  },
  externalId: {  
    type: String,
    unique: true,
    sparse: true, // Keep this if you want to allow null values for externalId
  },
  userId: { 
    type: String,
    required: true,
    unique: true,
  },
  formsCreated: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Hire', 
  }],
  formsSubmitted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission', 
  }],
  lastLogin: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
