import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "#controllers";
import { authenticate, authorize, validateBodyZod } from "#middlewares";
import { Category } from "#models";
import { categoryInputSchema } from "#schemas";
import { Router } from "express";

const categoryRoutes = Router();

categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:id", getCategoryById);

categoryRoutes.post(
  "/",
  authenticate,
  authorize(Category),
  //validateBodyZod(categoryInputSchema),
  createCategory
);

categoryRoutes.put(
  "/:id",
  authenticate,
  authorize(Category),
  validateBodyZod(categoryInputSchema),
  updateCategory
);

categoryRoutes.delete(
  "/:id",
  authenticate,
  authorize(Category),
  deleteCategory
);

export default categoryRoutes;
