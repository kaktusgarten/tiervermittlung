import type { RequestHandler } from "express";
import { User } from "#models";
import type { z } from "zod";
import type { userInputSchema } from "#schemas";
import mongoose, {
  isValidObjectId,
  type DefaultTimestampProps,
  type Document,
  type Types,
} from "mongoose";

type OwnerInputDTO = z.infer<typeof userInputSchema>;
type OwnerDTO = z.infer<typeof userInputSchema>;

// GET ALL ANIMALS ####################################################

export const getOwnerForMap: RequestHandler = async (req, res) => {
  // Alle Tiere mit der PLZ des Einstellers
  const ownerformap = await User.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(req.user?.id) },
    },

    {
      $lookup: {
        from: "plzcoordinates",
        localField: "postalCode",
        foreignField: "plz",
        as: "ownerpos",
      },
    },

    // Nur _id, lat, lng zurückgeben
    {
      $project: {
        _id: 1,
        lat: { $arrayElemAt: ["$ownerpos.lat", 0] },
        lng: { $arrayElemAt: ["$ownerpos.lng", 0] },
      },
    },
  ]);

  if (!ownerformap.length) {
    throw new Error("*No User found", { cause: { status: 404 } });
  }
  res.json(ownerformap);
};
