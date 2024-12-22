import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        send: {
        type: String,
          required: true,
    },
      invoicenumber: {
        type: String,
          required: true,
        },
        receive: {
          type: String,
          required: true,
        },
        address: {
          type: String,
        },
        bank: {
          type: String,
        },
        accountname: {
          type: String,
        },
        accountnum: {
          type: String,
        },
        created: {
          type: String,
          default: Date.now(),
          required: true,
        },
    status: {
      type: String,
      default: "Pending"
        },
    email: {
      type: String,
      required: true,
    },
      },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models.Order || mongoose.model("Order", orderSchema);
