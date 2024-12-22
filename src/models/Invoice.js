import mongoose from "mongoose";

const { Schema } = mongoose;

const invoiceSchema = new Schema({
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
        created: {
          type: String,
          default: Date.now(),
          required: true,
        },
        expired: {
          type: Boolean,
          default: false,
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
export default mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);
