import { useEffect, useState } from "react";
import { useAuth } from "../context";

export default function AnimalMessage({ animal }: { animal: Animal }) {
  const { user, signedIn } = useAuth();

  const [message, setMessage] = useState("");
  const [existingMessage, setExistingMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const fetchMyMessage = async () => {
      if (!user?._id) return;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/messages/sender/${user?._id}`
        );
        if (!res.ok) {
          throw new Error("Fehler beim Laden der Nachrichten");
        }
        const data = await res.json();

        // data.map((msg: Message) => {
        //   if (msg.animal === animal._id) {
        //     setMessage(msg.message);
        //     setExistingMessage(msg._id);
        //     console.log(msg);
        //   }
        // });
        // find message matching current animal
        const found = data.find((msg: Message) => {
          const animalId =
            typeof msg.animal === "string" ? msg.animal : msg.animal._id;
          return animalId === animal._id;
        });

        if (found) {
          setMessage(found.message);
          setExistingMessage(found._id);
          setIsEditing(false);
          console.log("Existing message found:", found);
        } else {
          setIsEditing(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyMessage();
  }, [user?._id, animal._id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!signedIn || !user) {
      setError("Bitte anmelden, um eine Nachricht zu senden.");
      return;
    }
    if (!message.trim()) {
      setError("Nachricht darf nicht leer sein.");
      return;
    }

    setLoading(true);
    try {
      // Safe owner extraction: handle both string and populated object
      const ownerId =
        typeof animal.owner === "string" ? animal.owner : animal.owner?._id;

      if (!ownerId) {
        throw new Error("Besitzer-ID fehlt");
      }
      const payload = {
        message: message.trim(),
        sender: user._id,
        animal: animal._id,
        owner: ownerId,
        status: "active",
      };

      let res: Response;

      if (!existingMessage) {
        res = await fetch(`${import.meta.env.VITE_APP_API_URL}/messages`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/messages/${existingMessage}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
      }
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Fehler beim Senden der Nachricht");
      }
      const updated = await res.json();

      setExistingMessage(updated._id);
      setIsEditing(false);
      setSuccess("Nachricht erfolgreich gesendet.");
    } catch (err: unknown) {
      setError((err as Error).message || "Unbekannter Fehler");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 4000);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel edit - reload original message
      const fetchMyMessage = async () => {
        if (!user?._id) return;
        try {
          const res = await fetch(
            `${import.meta.env.VITE_APP_API_URL}/messages/sender/${user?._id}`
          );
          if (res.ok) {
            const data = await res.json();
            const found = data.find((msg: Message) => {
              const animalId =
                typeof msg.animal === "string" ? msg.animal : msg.animal._id;
              return animalId === animal._id;
            });
            if (found) setMessage(found.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchMyMessage();
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }

    if (!existingMessage) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/messages/${existingMessage}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Fehler beim Löschen der Nachricht");
      }

      setMessage("");
      setExistingMessage(null);
      setIsEditing(true);
      setConfirmDelete(false);
      setSuccess("Nachricht erfolgreich gelöscht.");
    } catch (err: unknown) {
      setError((err as Error).message || "Unbekannter Fehler");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-[#C7C0CA] my-5 shadow-sm">
      <div className="card-body">
        <h3 className="card-title">Nachricht an Besitzer senden</h3>

        <label className="label">
          <span className="label-text">Nachricht</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Deine Nachricht an den Tierbesitzer"
          className="textarea textarea-bordered w-full resize-y bg-base-200 dark:bg-base-300 text-base-content"
          rows={5}
          aria-label="Nachricht"
          disabled={loading || !isEditing}
        />

        {error && (
          <div className="text-red-600 font-semibold text-sm mt-2" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div
            className="text-green-700 font-semibold text-sm mt-2"
            role="status"
          >
            {success}
          </div>
        )}

        <div className="card-actions mt-4">
          {existingMessage && !isEditing && (
            <>
              <button
                type="button"
                onClick={handleEditToggle}
                className="btn-secondary bg-gray-600 p-2 text-white w-full font-semibold"
              >
                Bearbeiten
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className={`p-2 text-white flex-1 font-semibold ${
                  confirmDelete ? "bg-red-600" : "bg-red-500"
                }`}
                disabled={loading}
              >
                {confirmDelete ? "Sicher?" : "Löschen"}
              </button>
            </>
          )}
          {isEditing && (
            <>
              <button
                type="submit"
                className={`${
                  loading ? "loading" : ""
                } btn-primary bg-[#2B1B12] p-2 text-white flex-1 font-semibold`}
                disabled={loading}
              >
                {existingMessage ? "Speichern" : "Senden"}
              </button>
              {existingMessage && (
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="btn-secondary bg-gray-600 p-2 text-white flex-1 font-semibold"
                  disabled={loading}
                >
                  Abbrechen
                </button>
              )}
            </>
          )}
          {/* <button
            type="submit"
            className={` ${loading ? "loading" : ""} btn-primary
            bg-[#2B1B12] p-2 mt-4 text-white w-full font-semibold`}
            disabled={loading}
          >
            {existingMessage ? "Bearbeiten" : "Senden"}
          </button> */}
        </div>
      </div>
    </form>
  );
}
