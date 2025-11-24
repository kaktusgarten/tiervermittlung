import type { RequestHandler } from "express";

const authorize = (Model: any): RequestHandler => {
  return async (req, res, next) => {
    const { id } = req.params;
    const model = await Model.findById(id);
    // nur wenn ID vorhanden ist, prüfen ob Model existiert
    if (id) {
      if (!model) {
        return next(
          new Error(`${Model.modelName} not found`, { cause: { status: 404 } })
        );
      }
    }
    // allow, if user is admin
    if (req.user?.roles?.includes("admin")) return next();
    // Ergänze Abfrage für Model ohne author-Feld (z.B. Category)
    if (!model.author) return next();
    const ownerId = model.author?.toString?.() ?? model._id.toString();

    if (ownerId !== req.user?.id) {
      return next(
        new Error("Forbidden, you cannot modify this", {
          cause: { status: 403 },
        })
      );
    }

    next();
  };
};

export default authorize;
