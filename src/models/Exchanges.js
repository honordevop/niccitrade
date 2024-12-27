import mongoose from "mongoose";

const { Schema } = mongoose;

const exchangeSchema = new Schema(
  {
    exchange: {
      type: String,
    },
    amount: {
      type: String,
    },
  },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models.Exchange ||
  mongoose.model("Exchange", exchangeSchema);
