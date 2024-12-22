import mongoose from "mongoose";

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    currency: {
      type: String,
    },
    address: {
      type: String,
    },
    desc: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models.Address ||
  mongoose.model("Address", addressSchema);
