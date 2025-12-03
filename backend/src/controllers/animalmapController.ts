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
import { match } from "assert";

type AnimalInputDTO = z.infer<typeof animalInputSchema>;
type AnimalDTO = z.infer<typeof animalInputSchema>;

// GET ALL ANIMALS ####################################################

export const getAnimalsForMap: RequestHandler = async (req, res) => {
  const query = req.query;
  const { id } = req.query;
  const { category, race, age, sex, handycap, characteristics } = req.query;

  // Filter vorbereiten
  const match: Record<string, any> = {};
  if (category) {
    match.category = { $regex: category as string, $options: "i" };
  }
  if (race) {
    match.race = { $regex: race as string, $options: "i" };
  }
  if (age) {
    match.age = { $regex: age as string, $options: "i" };
  }
  if (sex) {
    // const wildcard = sex.replace("egal", "*");
    // match.sex = { $regex: wildcard as string, $options: "i" };
    match.sex = { $regex: sex as string, $options: "i" };
  }
  if (handycap) {
    match.handycap = { $regex: handycap as string, $options: "i" };
  }
  console.log("getAnimalsForMap chara...: ", characteristics);
  if (characteristics) {
    let chars = characteristics;
    if (!Array.isArray(chars)) {
      chars = [chars];
    }

    match.characteristics = {
      // $regex: characteristics as string,
      // $options: "i",
      $all: chars.map((c) => RegExp(c, "i")),
      // $in: chars.map((c) => new RegExp(c, "i")),       // Eine characteristic muss zutreffen.
    };
  }

  // Daten abholen für Tiere und der PLZ von ihrem Einsteller. Nur die PLZ zurückgeben
  // Erweiterung um Tabelle plzcoordinates -- Funktioniert --
  const animalsformap = await Animal.aggregate([
    { $match: match },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "animalsowners",
      },
    },
    {
      $lookup: {
        from: "plzcoordinates",
        localField: "animalsowners.postalCode",
        foreignField: "plz",
        as: "animalspos",
      },
    },
    // Nur _id, category, lat, lng zurückgeben
    {
      $project: {
        _id: 1,
        category: 1,
        lat: { $arrayElemAt: ["$animalspos.lat", 0] },
        lng: { $arrayElemAt: ["$animalspos.lng", 0] },
      },
    },
  ]);

  console.log("animalsformap.length: ", animalsformap.length);

  if (!animalsformap.length) {
    throw new Error("No Animals found", { cause: { status: 404 } });
  }
  res.json(animalsformap);
};
