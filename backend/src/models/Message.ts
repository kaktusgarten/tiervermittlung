import { model, Schema } from "mongoose";

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
    trim: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  animal: {
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["active", "revoked", "declined", "archived"],
    default: "active",
    required: true,
  },
});

export default model("Message", messageSchema);
