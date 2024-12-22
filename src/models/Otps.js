import mongoose from "mongoose";

const { Schema } = mongoose;

const otpSchema = new Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models.Otp || mongoose.model("Otp", otpSchema);
