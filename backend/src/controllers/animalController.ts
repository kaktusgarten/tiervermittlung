import type { RequestHandler } from "express";
import { Animal } from "#models";
import type { z } from "zod";
import type { animalInputSchema } from "#schemas";
import {
  isValidObjectId,
  type DefaultTimestampProps,
  type Document,
  type Types,
} from "mongoose";

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
  let animals = {};
  const query = req.query;
  const { category, race, age, sex, handycap } = req.query;

  // const animals = await Animal.find().select("name category race age sex");

  if (!category && !race && !age && !sex && !handycap) {
    console.log("get all animals.");
    animals = await Animal.find();
  } else {
    console.log("have a query.");
    //    animals = await Animal.find(req.query); Alle Spalten baer case sensitive!
    // Eine Spalte case insensitive
    // animals = await Animal.find({
    //   category: {
    //     $regex: category,
    //     $options: "i",
    //   },
    // });
    let newQuery = [];
    if (category) {
      newQuery.push({ category: { $regex: category, $options: "i" } });
    }
    if (race) {
      newQuery.push({ race: { $regex: race, $options: "i" } });
    }
    if (age) {
      newQuery.push({ age: age });
    }
    if (sex) {
      newQuery.push({ sex: { $regex: sex, $options: "i" } });
    }
    if (handycap) {
      newQuery.push({ handycap: handycap });
    }

    console.log("newQuery: ", newQuery);

    animals = await Animal.find({ $and: newQuery });

    // animals = await Animal.find({
    //   $and: [
    //     { category: { $regex: category, $options: "i" } },
    //     { race: { $regex: race, $options: "i" } },
    //   ],
    // });
  }

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

  res.status(201).json(newAnimal);
};

// GET SINGLE ANIMAL
export const getAnimalById: RequestHandler<
  { id: string },
  unknown,
  AnimalInputDTO
> = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new Error(`Ungültige Eigenschaft-ID: ${id}`, {
      cause: { status: 400 },
    });
  }

  const animal = await Animal.findById(id).populate("owner", "_id");
  if (!animal) {
    throw new Error("Tier nicht gefunden", { cause: { status: 404 } });
  }

  res.status(201).json(animal);
};

// GET ANIMALS (Query)
export const getAnimalsByQuery: RequestHandler<
  unknown,
  AnimalDTO,
  AnimalInputDTO
> = async (req, res) => {
  const { query } = req.query;

  console.log("req.query", req.query);

  //  const animal = await Animal.findById(id);

  //  res.status(201).json(animal);
  res.status(201);
};

// UPDATE SINGLE ANIMAL
export const updateAnimal: RequestHandler<
  { id: string },
  AnimalDTO,
  AnimalInputDTO
> = async (req, res) => {
  const { id } = req.params;
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
      image_url: imageUrl,
    },
    { new: true, runValidators: true }
  );

  res.status(201).json(updatedAnimal);
};

// DELETE SINGLE ANIMAL
export const deleteAnimal: RequestHandler<
  { id: string },
  AnimalDTO,
  AnimalInputDTO
> = async (req, res) => {
  const { id } = req.params;

  const deletedAnimal = await Animal.findByIdAndDelete(id, {
    new: true,
    runValidators: true,
  });

  res.status(201).json(deletedAnimal);
};
