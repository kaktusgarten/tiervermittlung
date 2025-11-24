import bcrypt from "bcrypt";
import type { RequestHandler } from "express";
import { User } from "#models";
import type { z } from "zod";
import type {
  userInputSchema,
  changePasswordSchema,
  authRegisterSchema2,
} from "#schemas";

//Post User
type UserInputDTO = z.infer<typeof userInputSchema>;
type UserDTO = UserInputDTO;

//Tiervermittlung User
type UserInputDTO2 = z.infer<typeof authRegisterSchema2>;
type UserDTO2 = UserInputDTO2;
type ChangePasswordDTO = z.infer<typeof changePasswordSchema>;

// GET ALL USERS ####################################################

export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await User.find().select("firstName lastName roles");

  if (!users.length) {
    throw new Error("User not found", { cause: { status: 404 } });
  }
  res.json(users);
};

// GET USERS BY ID ##################################################

export const getUserById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found", { cause: { status: 404 } });
  }
  res.json(user);
};

// UPDATE USERS ####################################################
// POST USER
// export const updateUser: RequestHandler<
//   { id: string },
//   UserDTO,
//   UserInputDTO
// > = async (req, res) => {
//   const { id } = req.params;
//   const { firstName, lastName, email } = req.body;

//   const updatedUser = await User.findByIdAndUpdate(
//     id,
//     { firstName, lastName, email },
//     { new: true }
//   );

//   if (!updatedUser) {
//     throw new Error('User not found', { cause: { status: 404 } });
//   }
//   res.status(200).json(updatedUser);
// };

//Tiervermittlung USER
export const updateUser: RequestHandler<
  { id: string },
  UserDTO2,
  UserInputDTO2
> = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    street,
    streetNumber,
    city,
    postalCode,
    phone,
  } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      email,
      street,
      streetNumber,
      city,
      postalCode,
      phone,
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("User not found", { cause: { status: 404 } });
  }
  res.status(200).json(updatedUser);
};

// DELETE USERS ####################################################

export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    throw new Error("User not found", { cause: { status: 404 } });
  }
  res.status(200).json({ message: "User deleted successfully" });
};

// CHANGE PASSWORD ################################################
export const changePassword: RequestHandler<
  { id: string },
  { message: string },
  ChangePasswordDTO
> = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(id).select("+password");

  if (!user) {
    throw new Error("User not found", { cause: { status: 404 } });
  }

  const ok = await bcrypt.compare(currentPassword, user.password);

  if (!ok) {
    throw new Error("Invalid credentials", { cause: { status: 400 } });
  }

  const hash = await bcrypt.hash(newPassword, 10);
  user.password = hash;
  await user.save();

  res.clearCookie("accessToken");
  res.json({ message: "password updated, relogin" });
};
