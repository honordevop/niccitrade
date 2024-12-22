import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    invoicenumber: {
        type: String,
          required: true,
    },
    ref: {
        type: String,
          required: true,
        },
    amount: {
      type: String,
      required: true,
    },
    memo: {
      type: String,
      required: true,
    },
    created: {
      type: String,
      required: true,
      default: Date.now(),
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
