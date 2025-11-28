import { model, Schema } from "mongoose";

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
    trim: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    trim: true,
  },
  animal: {
    type: Schema.Types.ObjectId,
    ref: "Animal",
    required: true,
    trim: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["active", "declined"],
    default: "active",
    required: true,
  },
});

export default model("Message", messageSchema);
