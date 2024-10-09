import mongoose, { Schema } from "mongoose";

const featureSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  sections: {
    type: [String],
    enum: ['Product', 'UI/UX', 'Performance', 'Security', 'Other'],
    default : "Other",
    required: true
  },
  urgency: {
    type: [String],
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default : "Low",
    required: true
  },
  attachment: {
    type: String
  },
  upvotes: {
    type: Number,
    default: 0
  },
  // comments: {
  //   type: [
  //     {
  //       // user: {
  //       //   type: mongoose.Schema.Types.ObjectId,
  //       //   ref: 'User'
  //       // },
  //       content: {
  //         type: String,
  //         required: true
  //       },
  //       createdAt: {
  //         type: Date,
  //         default: Date.now   

  //       }
  //     }
  //   ]
  // },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Rejected'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Feature = mongoose.model("Feature",featureSchema)