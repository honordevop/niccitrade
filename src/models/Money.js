import mongoose from "mongoose";

const { Schema } = mongoose;

const moneySchema = new Schema({
  email: { type: String, required: true, unique: true },
  moneyrecord: [
    {
      currency: { type: String, required: true },
      amount: { type: String, required: true },
    },
  ],
});

//If the Post collection does not exist create a new one.
export default mongoose.models.Money || mongoose.model("Money", moneySchema);
