import { getAnimalsForMap } from "#controllers";
import { authenticate, authorize, upload, validateBodyZod } from "#middlewares";
import { Router } from "express";

const animalformapRoutes = Router();

// PUBLIC
animalformapRoutes.get("/", getAnimalsForMap);

export default animalformapRoutes;
