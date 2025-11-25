import type { RequestHandler } from "express";
import { Animal } from "#models";
import type { z } from "zod";
import type { animalInputSchema } from "#schemas";
import type { DefaultTimestampProps, Document, Types } from "mongoose";

type AnimalInputDTO = z.infer<typeof animalInputSchema>;
type AnimalDTO = Document<
  unknown,
  {},
  {
    name: string;
    category: string;
    race: string;
    age: number;
    sex: number;
    owner: Types.ObjectId;
    image_url?: string[] | null | undefined;
  } & DefaultTimestampProps,
  {},
  {
    timestamps: true;
  }
> & {
  name: string;
  category: string;
  race: string;
  age: number;
  sex: number;
  owner: Types.ObjectId;
  image_url?: string[] | null | undefined;
} & DefaultTimestampProps & {
    _id: Types.ObjectId;
  } & {
    __v: number;
  };

// GET ALL ANIMALS ####################################################

export const getAllAnimals: RequestHandler = async (req, res) => {
  const animals = await Animal.find().select("name category race age sex");

  if (!animals.length) {
    throw new Error("No Animals found", { cause: { status: 404 } });
  }
  res.json(animals);
};

// CREATE AN ANIMAL
export const createAnimal: RequestHandler<
  unknown,
  AnimalDTO,
  AnimalInputDTO
> = async (req, res) => {
  const {
    name,
    category,
    race,
    age,
    sex,
    characteristics,
    description,
    handycap,
  } = req.body;
  const files = (req.files as Express.Multer.File[]) || [];
  let imageUrl: string[];
  if (files.length === 0) {
    imageUrl = [];
  } else {
    imageUrl = files.map((file) => file.path);
  }

  const newAnimal = await Animal.create({
    name,
    category,
    race,
    age,
    sex,
    owner: req.user?.id,
    image_url: imageUrl,
    characteristics: characteristics,
    description: description,
    handycap: handycap,
  });

  console.log("cloudinary upload results", files);
  res.status(201).json(newAnimal);
};

// GET AN SPECIAL ANIMAL
export const getAnimalById: RequestHandler<
  { id: string },
  AnimalDTO,
  AnimalInputDTO
> = async (req, res) => {
  const { id } = req.params;

  const animal = await Animal.findById(id);

  res.status(201).json(animal);
};

// Update
export const updateAnimal: RequestHandler<
  { id: string },
  AnimalDTO,
  AnimalInputDTO
> = async (req, res) => {
  const { id } = req.params;
  console.log("Body: ", req.body);
  const {
    name,
    category,
    race,
    age,
    sex,
    characteristics,
    description,
    handycap,
  } = req.body;

  const updatedAnimal = await Animal.findByIdAndUpdate(
    id,
    {
      name,
      category,
      race,
      age,
      sex,
      characteristics,
      description,
      handycap,
    },
    { new: true, runValidators: true }
  );

  res.status(201).json(updatedAnimal);
};

// Delete
