import { useEffect, useState } from "react";
import FormChangeUserData from "../components/FormChangeUserData";
import ProfileMessagesReceived from "../components/ProfileMessagesReceived";
import ProfileMessagesSent from "../components/ProfileMessagesSent";
import { useAuth } from "../context";
import { Link } from "react-router";

export default function UserProfilePage() {
  const { user } = useAuth();
  const [sentMessages, setSentMessages] = useState<Message[]>([]);
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [userAnimals, setUserAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchSentMessages = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/messages/sender/${user?._id}`
        );
        if (!res.ok) {
          throw new Error("Fehler beim Laden der Nachrichten");
        }
        const data = await res.json();
        setSentMessages(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchReceivedMessages = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/messages/owner/${user?._id}`
        );
        if (!res.ok) {
          throw new Error("Fehler beim Laden der Nachrichten");
        }
        const data = await res.json();
        setReceivedMessages(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserAnimals = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/animals`);
        if (!res.ok) {
          throw new Error("Fehler beim Laden der Tiere");
        }
        const data = await res.json();
        setUserAnimals(
          data.filter((animal: Animal) => {
            const owner =
              typeof animal.owner === "string" ? animal.owner : null;
            return owner === user?._id;
          })
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    // Lade alle gesendeten und erhaltenen Nachrichten sowie die Tiere des Users
    fetchSentMessages();
    fetchReceivedMessages();
    fetchUserAnimals();
  }, []);

  // Lösche Tieranzeige und zugehörige Nachrichten, so wie Bilder in Cloudinary
  const handleDelete = async (id: string) => {
    // Erster Klick: Frage nach Bestätigung
    if (confirmDelete !== id) {
      setConfirmDelete(id);
      setTimeout(() => setConfirmDelete(null), 3000);
      return;
    }
    // Zweiter Klick: Lösche die Tieranzeige
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/animals/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Fehler beim Löschen der Tieranzeige");
      }
      // Entferne die gelöschte Tieranzeige und zugehörige Nachrichten aus dem State
      setReceivedMessages((prev) => prev.filter((msg) => msg.animal !== id));
      setUserAnimals((prev) => prev.filter((animal) => animal._id !== id));
      setConfirmDelete(null);
      setSentMessages((prev) => prev.filter((m) => m._id !== id));
      setSuccess("Nachricht erfolgreich gelöscht.");
    } catch (err: unknown) {
      setError("Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  };
  // Filtere nur die aktiven erhaltenen Nachrichten
  const activeReceivedMessages = receivedMessages.filter(
    (msg) => msg.status === "active"
  );

  return (
    <main className="md:p-4 mb-12">
      <h1 className="mt-6 mb-10 max-md:text-center">Mein Konto</h1>

      {/* Kontobox */}

      <div className="grid lg:grid-cols-3 gap-10 rounded-2xl p-7 ">
        {/* Meine Kontodaten */}
        <div className="lg:col-span-1 col-span-2">
          <h3 className="mt-6">Meine Kontodaten:</h3>
          <FormChangeUserData />
        </div>
        {/* Meine Tiere und erhaltene Nachrichten von Interessenten */}
        <section className="col-span-2">
          <div className="">
            <h3 className="mb-4 my-6">Meine Tiere</h3>
            <section className=" p-2">
              {userAnimals.length > 0 ? (
                userAnimals.map((animal) => (
                  /* Iterriere über jedes Tier, das der User eingestellt hat */
                  <section
                    key={animal._id}
                    className="grid grid-cols-1 gap-9 mb-10"
                  >
                    <article className="card p-4 bg-base-300 position-relative mt-4">
                      <div className="flex flex-row text-sm text-muted gap-x-5 max-md:flex-col justify-center">
                        <div className="flex flex-col text-sm text-muted">
                          <h3 className="">{animal?.name}</h3>
                          {/* Tierbild */}
                          <figure className="max-md:w-full w-40 max-md:max-w-xs my-5 aspect-square">
                            <Link to={`/details/${animal._id}`}>
                              <img
                                src={
                                  animal?.image_url?.[0] ||
                                  "/placeholder-animal.png"
                                }
                                alt={animal?.name || "Tierbild"}
                                className="w-full h-full object-cover"
                              />
                            </Link>
                          </figure>
                          {/* Tierinformationen */}
                          <div className="flex-row gap-2">
                            <p className="text-sm">
                              <span className="font-bold"> Alter:</span>
                              <span> {animal?.age} Jahre </span>
                            </p>
                            <p className="text-sm">
                              <span className="font-bold"> Tierart:</span>
                              <span> {animal?.category} </span>
                            </p>
                            <p className="text-sm">
                              <span className="font-bold"> Rasse:</span>
                              <span> {animal?.race} </span>
                            </p>
                            {/* Tieranzeige löschen Button */}
                            <div className="mt-5">
                              <button
                                id={`delete-button-${animal._id}`}
                                type="button"
                                onClick={() => handleDelete(animal._id)}
                                className={`p-2 text-white flex-1 font-semibold w-full ${
                                  confirmDelete === animal._id
                                    ? "bg-red-600"
                                    : "bg-red-500"
                                }`}
                                disabled={loading}
                              >
                                {confirmDelete === animal._id
                                  ? "Sicher?"
                                  : "Löschen"}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          {activeReceivedMessages.filter((msg) => {
                            /* Iterriere über alle Nachrichten, die der Besitzer erhalten hat
                            und gib jede aus, die für das Tier bestimmt ist */
                            const msgAnimalId =
                              typeof msg.animal === "string"
                                ? msg.animal
                                : msg.animal?._id;
                            return msgAnimalId === animal._id;
                          }).length > 0 ? (
                            activeReceivedMessages
                              .filter((msg) => {
                                const msgAnimalId =
                                  typeof msg.animal === "string"
                                    ? msg.animal
                                    : msg.animal?._id;
                                return msgAnimalId === animal._id;
                              })
                              .map((receivedMessage) => (
                                <div
                                  key={receivedMessage._id}
                                  className="border-b last:border-0 p-2"
                                >
                                  <ProfileMessagesReceived
                                    msg={receivedMessage}
                                    setReceivedMessages={setReceivedMessages}
                                    animalId={animal._id}
                                  />
                                </div>
                              ))
                          ) : (
                            /* Anzeige, wenn das Tier noch keine Nachrichten erhalten hat */
                            <div className="bg-base-200 p-5 my-16 max-md:my-5">
                              <p className="text-center">
                                😿Noch keine Nachrichten erhalten😿
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  </section>
                ))
              ) : (
                /* Anzeige, wenn der User noch keine Tiere hinzugefügt hat */
                <div className="bg-base-200 p-5 my-16 max-md:my-5">
                  <p className="text-center">
                    😿Noch keine Tiere hinzugefügt😿
                  </p>
                </div>
              )}
            </section>
          </div>
          {/* Meine Anfragen */}
          <div className="mb-10">
            <h3 className="mb-4 mt-6">Gesendete Anfragen:</h3>
            <section className=" p-2">
              {sentMessages.length > 0 ? (
                sentMessages.map((message) => (
                  /* Iterriere über alle gesendeten Nachrichten */
                  <div key={message._id} className="border-b last:border-0 p-2">
                    <ProfileMessagesSent
                      msg={message}
                      setSentMessages={setSentMessages}
                    />
                  </div>
                ))
              ) : (
                /* Anzeige, wenn der User noch keine Anfragen gesendet hat */
                <div className="bg-base-200 p-5 my-16 max-md:my-5">
                  <p className="text-center ">
                    😿Noch keine Anfragen gesendet😿
                  </p>
                </div>
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
