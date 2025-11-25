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
    // Erlaube Aktionen für Admins
    if (req.user?.roles?.includes("admin")) return next();

    // Verweigere Modifikationen für Category und Characteristic für Nicht-Admins
    if (Model.modelName === "Category" || Model.modelName === "Characteristic")
      return next(
        new Error("Forbidden, you cannot modify this", {
          cause: { status: 403 },
        })
      );

    // Überprüfe, ob der angemeldete Benutzer der Besitzer des Tiers ist
    if (Model.modelName === "Animal") {
      if (!model.owner) return next();
      const ownerId = model.owner?.toString?.() ?? model._id.toString();
    }

    // Überprüfe, ob der angemeldete Benutzer der zu bearbeitende Benutzer ist
    if (Model.modelName === "User") {
      const userId = model._id.toString();
      if (userId !== req.user?.id) {
        return next(
          new Error("Forbidden, you cannot modify this", {
            cause: { status: 403 },
          })
        );
      }
    }
    // Überprüfe, ob der angemeldete Benutzer
    // der Absender der Nachricht
    // oder der Besitzer des Tiers ist
    if (Model.modelName === "Message") {
      const senderId = model.sender.toString();
      const ownerId = model.animal.owner.toString();
      const userId = req.user?.id;

      if (senderId === userId || ownerId === userId) return next();

      return next(
        new Error("Forbidden, you cannot modify this", {
          cause: { status: 403 },
        })
      );
    }

    // Überprüfe, ob der angemeldete Benutzer der Besitzer des Posts ist
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
