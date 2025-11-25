import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
});

export default model("Category", categorySchema);
