import { type RequestHandler } from "express";
import {
  Document,
  isValidObjectId,
  Types,
  type DefaultSchemaOptions,
} from "mongoose";
import { Characteristic } from "#models";
import { characteristicInputSchema } from "#schemas";
import type z from "zod";

type CharacteristicInputDTO = z.infer<typeof characteristicInputSchema>;
type CharacteristicOutputDTO =
  | (Document<
      unknown,
      {},
      {
        characteristic: string;
      },
      {},
      DefaultSchemaOptions
    > & {
      characteristic: string;
    } & {
      _id: Types.ObjectId;
    } & {
      __v: number;
    })
  | null;

export const getAllCharacteristics: RequestHandler<
  unknown,
  CharacteristicOutputDTO[],
  unknown
> = async (_req, res) => {
  const characteristics: CharacteristicOutputDTO[] =
    await Characteristic.find();
  return res.status(200).json(characteristics);
};

export const getCharacteristicById: RequestHandler<
  { id: string },
  CharacteristicOutputDTO,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    throw new Error(`Ungültige Eigenschaft-ID: ${id}`, {
      cause: { status: 400 },
    });

  const characteristic = await Characteristic.findById(id);

  if (!characteristic)
    throw new Error("Eigenschaft nicht gefunden", { cause: { status: 404 } });

  return res.status(200).json(characteristic);
};

export const createCharacteristic: RequestHandler<
  unknown,
  CharacteristicOutputDTO,
  CharacteristicInputDTO
> = async (req, res) => {
  const { characteristic } = req.body;
  const existing = await Characteristic.findOne({ characteristic });
  if (existing)
    throw new Error("Eigenschaft existiert bereits", {
      cause: { status: 409 },
    });

  const newCharacteristic = new Characteristic({ characteristic });
  await newCharacteristic.save();
  return res.status(201).json(newCharacteristic);
};

export const updateCharacteristic: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    throw new Error("Ungültige Eigenschaft-ID", { cause: { status: 400 } });

  const parsed = characteristicInputSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new Error("Validierungsfehler", {
      cause: { status: 400, errors: parsed.error.issues },
    });
  }

  try {
    const updated = await Characteristic.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true, runValidators: true }
    );
    if (!updated)
      throw new Error("Eigenschaft nicht gefunden", { cause: { status: 404 } });
    return res.status(200).json(updated);
  } catch (err) {
    throw new Error("Serverfehler", {
      cause: { status: 500, error: (err as Error).message },
    });
  }
};

export const deleteCharacteristic: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    throw new Error("Ungültige Eigenschaft-ID", { cause: { status: 400 } });

  try {
    const deleted = await Characteristic.findByIdAndDelete(id);
    if (!deleted)
      throw new Error("Eigenschaft nicht gefunden", { cause: { status: 404 } });
    return res.status(200).json({ message: "Eigenschaft gelöscht" });
  } catch (err) {
    throw new Error("Serverfehler", {
      cause: { status: 500, error: (err as Error).message },
    });
  }
};
