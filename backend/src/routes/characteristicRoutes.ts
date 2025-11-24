import {
  createCharacteristic,
  deleteCharacteristic,
  getAllCharacteristics,
  getCharacteristicById,
  updateCharacteristic,
} from "#controllers";
import { authenticate, authorize, validateBodyZod } from "#middlewares";
import { Characteristic } from "#models";
import { characteristicInputSchema } from "#schemas";
import { Router } from "express";

const characteristicRoutes = Router();

characteristicRoutes.get("/", getAllCharacteristics);
characteristicRoutes.get("/:id", getCharacteristicById);

characteristicRoutes.post(
  "/",
  authenticate,
  authorize(Characteristic),
  validateBodyZod(characteristicInputSchema),
  createCharacteristic
);

characteristicRoutes.put(
  "/:id",
  authenticate,
  authorize(Characteristic),
  validateBodyZod(characteristicInputSchema),
  updateCharacteristic
);

characteristicRoutes.delete(
  "/:id",
  authenticate,
  authorize(Characteristic),
  deleteCharacteristic
);

export default characteristicRoutes;
