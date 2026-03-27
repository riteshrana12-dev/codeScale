import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true }, // firstname userInput
  lastName: { type: String, required: true }, // lastname userINPUT
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  }, // user email
  password: { type: String, required: true, trim: true }, // user password
  role: { type: String, required: true }, // user role

  // Profile Customization
  profile: {
    avatar: { type: String, default: "https://via.placeholder.com/150" },
    bio: { type: String, maxLength: 200 },
    github: { type: String },
    linkedin: { type: String },
    website: { type: String },
  },

  summary: {
    totalSolved: { type: Number, default: 0 },
    totalSubmissions: { type: Number, default: 0 }, // For accuracy %
    easySolved: { type: Number, default: 0 },
    mediumSolved: { type: Number, default: 0 },
    hardSolved: { type: Number, default: 0 },
    easyPoints: { type: Number, default: 0 },
    mediumPoints: { type: Number, default: 0 },
    hardPoints: { type: Number, default: 0 }, // Reward system/Gamification
    totalPoints: { type: Number, default: 0 }, // Sum of all points
  },

  // Engagement & Gamification
  activity: {
    streak: { type: Number, default: 0 },
    maxStreak: { type: Number, default: 0 },
    lastSubmissionDate: { type: Date, default: null }, //Important
    joinedDate: { type: Date, default: Date.now },
  },
});

const userModel = model("profile", userSchema);
export default userModel;
