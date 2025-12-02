import { useState } from "react";
import { useAuth } from "../context";
import { Link } from "react-router";

export default function ProfileMessagesSent({
  msg,
  setSentMessages,
}: {
  msg: Message;
  setSentMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
  const { user, signedIn } = useAuth();
  const [message, setMessage] = useState(msg.message);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  // Extrahiere Besitzer und Tier-Objekte
  const owner = typeof msg.owner === "string" ? null : msg.owner;
  const animal = typeof msg.animal === "string" ? null : msg.animal;

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
      // Stelle sicher, dass Tier-ID und Besitzer-ID vorhanden sind
      const animalId =
        typeof msg.animal === "string" ? msg.animal : msg.animal?._id;
      if (!msg.owner) {
        throw new Error("Besitzer-ID fehlt");
      }
      // Bereite die Payload für die Aktualisierung vor
      const payload = {
        message: message.trim(),
        sender: user._id,
        animal: animalId,
        owner: owner?._id,
        status: "active",
      };
      // Sende die Aktualisierungsanfrage an die API
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/messages/${msg._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error("Fehler beim Senden der Nachricht");
      }
      const updated = await res.json();
      // Aktualisiere den lokalen Zustand mit der neuen Nachricht
      setMessage(updated.message);
      setIsEditing(false);
      setSuccess("Nachricht erfolgreich gesendet.");
    } catch (err: unknown) {
      setError("Unbekannter Fehler");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 4000);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Brichte den Bearbeitungsmodus ab und lade die ursprüngliche Nachricht neu
      const fetchMyMessage = async () => {
        if (!user?._id) return;
        // Lade die ursprüngliche Nachricht vom Server
        try {
          const res = await fetch(
            `${import.meta.env.VITE_APP_API_URL}/messages/${msg._id}`
          );
          if (res.ok) {
            const data = await res.json();
            setMessage(data.message);
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
    // Erster Klick: Frage nach Bestätigung
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    // Zweiter Klick: Lösche die Nachricht
    setLoading(true);
    try {
      // Sende die Löschanfrage an die API
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/messages/${msg._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Fehler beim Löschen der Nachricht");
      }
      // Entferne die Nachricht aus dem lokalen Zustand
      setMessage("");
      setIsEditing(true);
      setConfirmDelete(false);
      setSentMessages((prev) => prev.filter((m) => m._id !== msg._id));
      setSuccess("Nachricht erfolgreich gelöscht.");
    } catch (err: unknown) {
      setError("Unbekannter Fehler");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 4000);
    }
  };

  return (
    <>
      {/* Anzeige der gesendeten Nachricht im Profil des Absenders */}
      <article
        key={msg._id}
        className="card p-4 bg-base-200 dark:bg-base-300 position-relative mt-4"
      >
        <h3 className="max-md:text-center">{animal?.name}</h3>
        <div className="flex max-md:flex-col flex-row gap-5 mb-2 text-sm text-muted">
          {/* Tierbild und Details */}
          <div className="my-6 flex flex-row flex-wrap max-md:flex-col gap-2">
            <div className="flex justify-center ">
              <Link to={`/details/${animal?._id}`}>
                <figure className="w-40 h-40">
                  <img
                    src={animal?.image_url?.[0] || "/placeholder-animal.png"}
                    alt={animal?.name || "Tierbild"}
                    className="w-full h-full object-cover"
                  />
                </figure>
              </Link>
            </div>
            <div className="max-md:hidden flex flex-col gap-2 text-sm text-muted">
              <span className="font-bold"> Alter:</span>
              <span> {animal?.age} Jahre </span>

              <span className="font-bold"> Tierart:</span>
              <span> {animal?.category} </span>

              <span className="font-bold"> Rasse:</span>
              <span> {animal?.race} </span>

              <span className="font-bold"> Ort:</span>
              <span> {owner?.city} </span>
            </div>
          </div>
          {/* Formular zum Bearbeiten der Nachricht */}
          <form
            onSubmit={handleSubmit}
            className="card bg-base-200 my-5 shadow-sm w-full"
          >
            <div className="card-body">
              <h3 className="card-title">
                {owner?.firstName + " " + owner?.lastName}
              </h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Deine Nachricht an den Tierbesitzer"
                className="textarea textarea-bordered w-full resize-y bg-base-100 dark:bg-base-100 text-base-content max-md:text-xs overflow-auto"
                rows={10}
                aria-label="Nachricht"
                disabled={loading || !isEditing}
              />
              {/* Anzeige von Fehler- oder Erfolgsmeldungen */}
              {error && (
                <div
                  className="text-red-600 font-semibold text-sm mt-2"
                  role="alert"
                >
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
              {/* Buttons zum Bearbeiten, Löschen oder Speichern der Nachricht */}
              <div className="card-actions max-sm:flex-col mt-4">
                {!isEditing && (
                  <>
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="btn-secondary bg-gray-600 p-2 text-white flex-1 font-semibold w-full"
                      disabled={loading}
                    >
                      Bearbeiten
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className={`p-2 text-white flex-1 font-semibold w-full ${
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
                      Speichern
                    </button>

                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="btn-secondary bg-gray-600 p-2 text-white flex-1 font-semibold"
                      disabled={loading}
                    >
                      Abbrechen
                    </button>
                  </>
                )}
              </div>
              {/* Anzeige des Status der Nachricht */}
              {msg.status === "declined" ? (
                <p className="text-red-600 font-semibold text-sm mt-2 text-center">
                  Ihre Anfrage wurde vom Tierbesitzer abgelehnt.
                </p>
              ) : (
                <p className="text-green-600 font-semibold text-sm mt-2 text-center">
                  Der Tierbesitzer hat Ihre Anfrage erhalten und wird sich mit
                  Ihnen in Verbindung setzen.
                </p>
              )}
            </div>
          </form>
        </div>
      </article>
    </>
  );
}
