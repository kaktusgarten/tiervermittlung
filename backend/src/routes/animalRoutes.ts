import {
  deleteAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
  createAnimal,
} from "#controllers";
import { authenticate, authorize, upload, validateBodyZod } from "#middlewares";
import { Animal } from "#models";
import { animalInputSchema } from "#schemas";
import { Router } from "express";

const animalRoutes = Router();

// PUBLIC
animalRoutes.get("/", getAllAnimals);

// animalRoutes.post("/", validateBodyZod(animalInputSchema), createAnimal);
animalRoutes.post(
  "/",
  authenticate,
  upload.array("image", 4),
  validateBodyZod(animalInputSchema),
  createAnimal
);

animalRoutes.get("/:id", getAnimalById);

animalRoutes.put(
  "/:id",
  authenticate,
  authorize(Animal),
  upload.array("image", 4),
  validateBodyZod(animalInputSchema),
  updateAnimal
);

animalRoutes.delete("/:id", authenticate, authorize(Animal), deleteAnimal);

export default animalRoutes;
