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
      // Fetch Nachrichten des angemeldeten Benutzers
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/messages/sender/${user?._id}`
        );
        if (!res.ok) {
          throw new Error("Fehler beim Laden der Nachrichten");
        }
        const data = await res.json();
        // Suche nach einer Nachricht für das aktuelle Tier
        const found = data.find((msg: Message) => {
          if (!msg.animal) return false;
          const animalId =
            typeof msg.animal === "string" ? msg.animal : msg.animal._id;
          return animalId === animal._id;
        });
        // Wenn gefunden, setze Nachricht und vorhandene Nachrichten-ID
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

  // Nachricht senden oder aktualisieren
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    // Überprüfe, ob der Benutzer angemeldet ist
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
      // Sichere Besitzer-Extraktion: Behandle sowohl String als auch befülltes Objekt
      const ownerId =
        typeof animal.owner === "string" ? animal.owner : animal.owner?._id;
      // Stelle sicher, dass die Besitzer-ID vorhanden ist
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
      // Wenn keine vorhandene Nachricht, erstelle eine neue, sonst aktualisiere die vorhandene
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
      // Setze die Nachrichten-ID und beende den Bearbeitungsmodus
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
      // Brichte die Bearbeitung ab - lade die ursprüngliche Nachricht neu
      const fetchMyMessage = async () => {
        if (!user?._id) return;
        try {
          const res = await fetch(
            `${import.meta.env.VITE_APP_API_URL}/messages/sender/${user?._id}`
          );
          if (res.ok) {
            const data = await res.json();
            // Suche nach der Nachricht für das aktuelle Tier
            const found = data.find((msg: Message) => {
              if (!msg.animal) return false;
              const animalId =
                typeof msg.animal === "string" ? msg.animal : msg.animal._id;
              return animalId === animal._id;
            });
            // Wenn gefunden, setze die Nachricht in den Zustand ein
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
    // Bestätigungsabfrage vor dem Löschen
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    // Wenn keine vorhandene Nachricht, tue nichts
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
      // Nach dem Löschen, setze den Zustand zurück
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
        {/* Textbereich für die Nachrichteneingabe */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Deine Nachricht an den Tierbesitzer"
          className="textarea textarea-bordered w-full resize-y bg-base-200 dark:bg-base-300 text-base-content"
          rows={5}
          aria-label="Nachricht"
          disabled={loading || !isEditing}
        />
        {/* Anzeige von Fehler- oder Erfolgsmeldungen */}
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
        {/* Buttons zum Bearbeiten, Löschen oder Senden der Nachricht */}
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
          {/* Buttons zum Speichern oder Abbrechen der Bearbeitung */}
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
        </div>
      </div>
    </form>
  );
}
