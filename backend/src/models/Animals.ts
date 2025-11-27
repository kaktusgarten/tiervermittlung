import { model, Schema } from "mongoose";
import { required } from "zod/mini";

const animalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    race: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    sex: {
      type: String,
      required: true,
    },

    // Wird Array
    characteristics: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    // Array
    image_url: {
      type: [String],
      required: false,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    handycap: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Animal", animalSchema);
