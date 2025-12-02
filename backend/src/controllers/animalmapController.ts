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
type AnimalDTO = z.infer<typeof animalInputSchema>;

// GET ALL ANIMALS ####################################################

export const getAnimalsForMap: RequestHandler = async (req, res) => {
  const query = req.query;
  const { id } = req.query;

  // Daten abholen für Tiere und der PLZ von ihrem Einsteller. Nur die PLZ zurückgeben
  // Erweiterung um Tabelle plzcoordinates -- Funktioniert --
  const animalsformap = await Animal.aggregate([
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

  if (!animalsformap.length) {
    throw new Error("No Animals found", { cause: { status: 404 } });
  }
  res.json(animalsformap);
};
