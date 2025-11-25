import { Schema, model } from "mongoose";

//Post User Schema
// const userSchema = new Schema(
//   {
//     firstName: {
//       type: String,
//       required: [true, 'sasha is required'],
//       trim: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: [true, 'password is required'],
//       select: false,
//     },
//     roles: {
//       type: [String],
//       default: ['user'],
//     },
//     tokenVersion: {
//       type: Number,
//       default: 0,
//       select: false,
//     },
//   },
//   { timestamps: { createdAt: true, updatedAt: false } }
// );

//Tiervermittlung User Schema
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Vorname ist erforderlich"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Nachname ist erforderlich"],
      trim: true,
    },
    street: {
      type: String,
      required: [true, "Straße ist erforderlich"],
      trim: true,
    },
    streetNumber: {
      type: String,
      required: [true, "Hausnummer ist erforderlich"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "Stadt ist erforderlich"],
      trim: true,
    },
    postalCode: {
      type: String,
      required: [true, "Postleitzahl ist erforderlich"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Telefonnummer ist erforderlich"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "E-Mail ist erforderlich"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Passwort ist erforderlich"],
      select: false,
    },
    roles: {
      type: [String],
      default: ["user"],
    },
    tokenVersion: {
      type: Number,
      default: 0,
      select: false,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model("User", userSchema);
