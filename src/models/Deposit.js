import mongoose from "mongoose";

const { Schema } = mongoose;

const depositSchema = new Schema(
  {
    exchange: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models.Deposit ||
  mongoose.model("Deposit", depositSchema);
