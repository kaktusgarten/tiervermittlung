import {
  //   changePassword,
  //   deleteUser,
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
  validateBodyZod(animalInputSchema),
  updateAnimal
);

// userRoutes.patch(
//   '/:id/password',
//   authenticate,
//   authorize(User),
//   validateBodyZod(changePasswordSchema),
//   changePassword
// );

//animalRoutes.delete('/:id', authenticate, authorize(Animal), deleteAnimal);

export default animalRoutes;
