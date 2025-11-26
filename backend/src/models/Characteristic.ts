import { model, Schema } from "mongoose";

const characteristicSchema = new Schema({
  characteristic: {
    type: String,
    required: true,
    trim: true,
  },
});

export default model("Characteristic", characteristicSchema);
