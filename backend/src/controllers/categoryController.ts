import { type RequestHandler } from "express";
import {
  Document,
  isValidObjectId,
  Types,
  type DefaultSchemaOptions,
} from "mongoose";
import { Category } from "#models";
import { categoryInputSchema } from "#schemas";
import type z from "zod";

type CategoryInputDTO = z.infer<typeof categoryInputSchema>;
type CategoryOutputDTO = Document<
  unknown,
  {},
  {
    categoryName: string;
  },
  {},
  DefaultSchemaOptions
> & {
  categoryName: string;
} & {
  _id: Types.ObjectId;
} & {
  __v: number;
};

export const getAllCategories: RequestHandler<
  unknown,
  CategoryOutputDTO[],
  unknown
> = async (_req, res) => {
  const categories: CategoryOutputDTO[] = await Category.find();
  return res.status(200).json(categories);
};

export const getCategoryById: RequestHandler<
  { id: string },
  CategoryOutputDTO,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    throw new Error(`Ungültige Kategorie-ID: ${id}`, {
      cause: { status: 400 },
    });

  const category = await Category.findById(id);

  if (!category)
    throw new Error("Kategorie nicht gefunden", { cause: { status: 404 } });

  return res.status(200).json(category);
};

export const createCategory: RequestHandler<
  unknown,
  CategoryOutputDTO,
  CategoryInputDTO
> = async (req, res) => {
  const { categoryName } = req.body;
  const existing = await Category.findOne({ categoryName });
  if (existing)
    throw new Error("Kategorie existiert bereits", { cause: { status: 409 } });

  const category = new Category({ categoryName });
  await category.save();
  return res.status(201).json(category);
};

export const updateCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    throw new Error("Ungültige Kategorie-ID", { cause: { status: 400 } });

  const parsed = categoryInputSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new Error("Validierungsfehler", {
      cause: { status: 400, errors: parsed.error.issues },
    });
  }

  try {
    const updated = await Category.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true, runValidators: true }
    );
    if (!updated)
      throw new Error("Kategorie nicht gefunden", { cause: { status: 404 } });
    return res.status(200).json(updated);
  } catch (err) {
    throw new Error("Serverfehler", {
      cause: { status: 500, error: (err as Error).message },
    });
  }
};

export const deleteCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    throw new Error("Ungültige Kategorie-ID", { cause: { status: 400 } });

  try {
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted)
      throw new Error("Kategorie nicht gefunden", { cause: { status: 404 } });
    return res.status(200).json({ message: "Kategorie gelöscht" });
  } catch (err) {
    throw new Error("Serverfehler", {
      cause: { status: 500, error: (err as Error).message },
    });
  }
};
