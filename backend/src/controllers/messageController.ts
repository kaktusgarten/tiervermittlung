import { type RequestHandler } from "express";
import { Document, Types, type DefaultSchemaOptions } from "mongoose";
import { Animal, Message } from "#models";
import { messageInputSchema } from "#schemas";
import type z from "zod";

type MessageInputDTO = z.infer<typeof messageInputSchema>;
type MessageOutputDTO =
  | (Document<
      unknown,
      {},
      {
        message: string;
        sender: Types.ObjectId;
        animal: Types.ObjectId;
        status: "active" | "declined";
      },
      {},
      DefaultSchemaOptions
    > & {
      message: string;
      sender: Types.ObjectId;
      animal: Types.ObjectId;
      status: "active" | "declined";
    } & {
      _id: Types.ObjectId;
    } & {
      __v: number;
    })
  | null;

export const getAllMessages: RequestHandler<
  unknown,
  MessageOutputDTO[],
  unknown
> = async (_req, res) => {
  const messages: MessageOutputDTO[] = await Message.find();
  return res.status(200).json(messages);
};

export const getMessageById: RequestHandler<
  { id: string },
  unknown,
  unknown
> = async (req, res) => {
  const { id } = req.params;

  const message = await Message.findById(id)
    .populate({
      path: "animal",
      select: "_id name category race age image_url owner",
    })
    .populate({ path: "owner", select: "firstName lastName city _id" })
    .sort({ createdAt: -1 })
    .lean();

  if (!message)
    throw new Error("Nachricht nicht gefunden", { cause: { status: 404 } });

  return res.status(200).json(message);
};

export const getMessagesByAnimalId: RequestHandler<
  { id: string },
  unknown[],
  unknown
> = async (req, res) => {
  const { id } = req.params;

  const animalMessages = await Message.find()
    .where("animal")
    .equals(id)
    .populate({ path: "sender", select: "firstName lastName email phone _id" })
    .populate({ path: "animal", select: "name _id owner" })
    .sort({ createdAt: -1 })
    .lean();
  if (!animalMessages)
    throw new Error("Nachricht nicht gefunden", { cause: { status: 404 } });

  return res.status(200).json(animalMessages);
};

export const getMessagesBySenderId: RequestHandler<
  { id: string },
  unknown[],
  unknown
> = async (req, res) => {
  const { id } = req.params;

  const senderMessages = await Message.find()
    .where("sender")
    .equals(id)
    .populate({
      path: "animal",
      select: "_id name category race age image_url owner",
    })
    .populate({ path: "owner", select: "firstName lastName city _id" })
    .sort({ createdAt: -1 })
    .lean();

  if (!senderMessages)
    throw new Error("Nachricht nicht gefunden", { cause: { status: 404 } });

  return res.status(200).json(senderMessages);
};

export const getMessagesByOwnerId: RequestHandler<
  { id: string },
  unknown[],
  unknown
> = async (req, res) => {
  const { id } = req.params;

  const senderMessages = await Message.find()
    .where("owner")
    .equals(id)
    .populate({
      path: "animal",
      select: "_id name category race age image_url",
    })
    .populate({ path: "sender", select: "firstName lastName email phone _id" })
    .sort({ createdAt: -1 })
    .lean();

  if (!senderMessages)
    throw new Error("Nachricht nicht gefunden", { cause: { status: 404 } });

  return res.status(200).json(senderMessages);
};

export const createMessage: RequestHandler<
  unknown,
  MessageOutputDTO,
  MessageInputDTO
> = async (req, res) => {
  const { message, sender, animal, owner, status } = req.body;

  // fallback: fetch owner from animal if not provided
  // if (!owner) {
  //   const animalDoc = await Animal.findById(animal).select("owner").lean();
  //   if (!animalDoc?.owner) {
  //     throw new Error("Tier oder Besitzer nicht gefunden", {
  //       cause: { status: 404 },
  //     });
  //   }
  //   owner = animalDoc.owner.toString();
  // }

  const existing = await Message.findOne({ animal, sender });
  if (existing)
    throw new Error(
      "Sie haben bereits eine Anfrage für dieses Tier gesendet!",
      {
        cause: { status: 409 },
      }
    );

  const newMessage = new Message({ message, sender, animal, owner, status });
  await newMessage.save();
  return res.status(201).json(newMessage);
};

export const updateMessage: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await Message.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated)
      throw new Error("Nachricht nicht gefunden", { cause: { status: 404 } });
    return res.status(200).json(updated);
  } catch (err) {
    throw new Error("Serverfehler", {
      cause: { status: 500, error: (err as Error).message },
    });
  }
};

// export const revokeMessage: RequestHandler = async (req, res) => {
//   const { id } = req.params;

//   try {
//     let revoked: MessageOutputDTO = null;
//     if (req.user === req.body.sender) {
//       revoked = await Message.findByIdAndUpdate(
//         id,
//         { $set: { ...req.body, status: "revoked" } },
//         { new: true, runValidators: true }
//       );
//     } else {
//       throw new Error("Nur der Absender kann die Anfrage zurückziehen", {
//         cause: { status: 403 },
//       });
//     }
//     if (!revoked)
//       throw new Error("Nachricht nicht gefunden", { cause: { status: 404 } });
//     return res.status(200).json(revoked);
//   } catch (err) {
//     throw new Error("Serverfehler", {
//       cause: { status: 500, error: (err as Error).message },
//     });
//   }
// };

export const declineMessage: RequestHandler = async (req, res) => {
  const { id } = req.params;

  // Hole die Message (authorize hat sie bereits geprüft)
  const message = await Message.findById(id);
  if (!message) {
    throw new Error("Nachricht nicht gefunden", { cause: { status: 404 } });
  }

  // Update status to declined
  message.status = "declined";
  await message.save();

  return res.status(200).json(message);
};
//   const { id } = req.params;
//   const owner = req.body.animal.owner;
//   try {
//     let declined: MessageOutputDTO = null;
//     if (req.user === owner) {
//       declined = await Message.findByIdAndUpdate(
//         id,
//         { $set: { ...req.body, status: "declined" } },
//         { new: true, runValidators: true }
//       );
//     } else {
//       throw new Error("Nur der Besitzer des Tieres kann die Anfrage ablehnen", {
//         cause: { status: 403 },
//       });
//     }
//     if (!declined)
//       throw new Error("Nachricht nicht gefunden", { cause: { status: 404 } });
//     return res.status(200).json(declined);
//   } catch (err) {
//     throw new Error("Serverfehler", {
//       cause: { status: 500, error: (err as Error).message },
//     });
//   }
// };

export const deleteMessage: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted)
      throw new Error("Nachricht nicht gefunden", { cause: { status: 404 } });
    return res.status(200).json({ message: "Nachricht gelöscht" });
  } catch (err) {
    throw new Error("Serverfehler", {
      cause: { status: 500, error: (err as Error).message },
    });
  }
};
