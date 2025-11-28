import {
  createMessage,
  deleteMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  declineMessage,
  // revokeMessage,
  getMessagesByAnimalId,
  getMessagesBySenderId,
} from "#controllers";
import { authenticate, authorize, validateBodyZod } from "#middlewares";
import { Message } from "#models";
import { messageInputSchema } from "#schemas";
import { Router } from "express";

const messageRoutes = Router();

messageRoutes.get("/", getAllMessages);
messageRoutes.get("/:id", getMessageById);
messageRoutes.get("/animal/:id", getMessagesByAnimalId);
messageRoutes.get("/sender/:id", getMessagesBySenderId);
messageRoutes.post(
  "/",
  authenticate,
  authorize(Message),
  validateBodyZod(messageInputSchema),
  createMessage
);

messageRoutes.put(
  "/:id",
  authenticate,
  authorize(Message),
  validateBodyZod(messageInputSchema),
  updateMessage
);

messageRoutes.put(
  "/decline/:id",
  authenticate,
  authorize(Message),
  declineMessage
);

// messageRoutes.put(
//   "/revoke/:id",
//   authenticate,
//   authorize(Message),
//   revokeMessage
// );

messageRoutes.delete("/:id", authenticate, authorize(Message), deleteMessage);

export default messageRoutes;
