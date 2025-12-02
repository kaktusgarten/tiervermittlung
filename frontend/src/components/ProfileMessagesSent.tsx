import { useState } from "react";
import { useAuth } from "../context";

export default function ProfileMessagesSent({
  msg,
  setSentMessages,
}: {
  msg: Message;
  setSentMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
  const { user, signedIn } = useAuth();

  //const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState(msg.message);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

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
      const animalId =
        typeof msg.animal === "string" ? msg.animal : msg.animal?._id;
      if (!msg.owner) {
        throw new Error("Besitzer-ID fehlt");
      }
      const payload = {
        message: message.trim(),
        sender: user._id,
        animal: animalId,
        owner: owner?._id,
        status: "active",
      };

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
        const text = await res.text();
        throw new Error(text || "Fehler beim Senden der Nachricht");
      }
      const updated = await res.json();

      setMessage(updated.message);
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
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/messages/${msg._id}`,
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
      setIsEditing(true);
      setConfirmDelete(false);
      setSentMessages((prev) => prev.filter((m) => m._id !== msg._id));
      setSuccess("Nachricht erfolgreich gelöscht.");
    } catch (err: unknown) {
      setError((err as Error).message || "Unbekannter Fehler");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 4000);
    }
  };

  return (
    <>
      <article
        key={msg._id}
        className="card p-4 bg-base-200 dark:bg-base-300 position-relative mt-4"
      >
        <h3 className="text-center">{animal?.name}</h3>
        <div className="flex max-md:flex-col flex-row gap-5 mb-2 text-sm text-muted">
          <div className="my-6 flex flex-row flex-wrap max-md:flex-col gap-2">
            <div className="flex justify-center ">
              <figure className="w-40 h-40">
                <img
                  src={animal?.image_url?.[0] || "/placeholder-animal.png"}
                  alt={animal?.name || "Tierbild"}
                  className="w-full h-full object-cover"
                />
              </figure>
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
          <form
            onSubmit={handleSubmit}
            className="card bg-base-200 my-5 shadow-sm w-full"
          >
            <div className="card-body">
              <h3 className="card-title">
                Ihre Nachricht an: <br />{" "}
                {owner?.firstName + " " + owner?.lastName}
              </h3>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Deine Nachricht an den Tierbesitzer"
                className="textarea textarea-bordered w-full resize-y bg-base-100 dark:bg-base-100 text-base-content max-md:text-xs"
                rows={5}
                aria-label="Nachricht"
                disabled={loading || !isEditing}
              />

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
            </div>
          </form>
        </div>
      </article>
    </>
  );
}
