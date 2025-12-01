import { getOwnerForMap } from "#controllers";
import { authenticate, authorize, upload, validateBodyZod } from "#middlewares";
import { Animal } from "#models";
import { animalInputSchema } from "#schemas";
import { Router } from "express";

const ownerformapRoutes = Router();

// PUBLIC
ownerformapRoutes.get("/", authenticate, getOwnerForMap);

export default ownerformapRoutes;
