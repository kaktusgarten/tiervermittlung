import { useEffect, useState } from "react";

export default function AnimalMessagesReceived({ animal }: { animal: Animal }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [confirmDecline, setConfirmDecline] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/messages/animal/${animal._id}`
        );
        if (!res.ok) {
          throw new Error("Fehler beim Laden der Nachrichten");
        }
        const data = await res.json();
        setMessages(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, []);
  // Nachricht ablehnen
  async function handleDecline(messageId: string) {
    // Erster Klick: Frage nach Bestätigung
    if (!confirmDecline) {
      setConfirmDecline(messageId);
      // Reset nach 3 Sekunden
      setTimeout(() => setConfirmDecline(null), 3000);
      return;
    }
    // Zweiter Klick: Lehne die Message ab
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/messages/decline/${messageId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Fehler beim Ablehnen der Nachricht");
      }
      // Entferne die Nachricht aus dem Zustand
      const updatedMessages = messages.filter(
        (message) => message._id !== messageId
      );
      setMessages(updatedMessages);
    } catch (error) {
      console.log(error);
    } finally {
      setConfirmDecline(null);
    }
  }
  // Filtere nur aktive Nachrichten
  const activeMessages = messages.filter((msg) => msg.status === "active");

  return (
    <>
      <h2 className="mt-10 text-center">
        {`Diese Personen interessieren sich für ${animal.name}`}
      </h2>
      {/* Anzeige der aktiven Nachrichten */}
      <section className="grid xl:grid-cols-3 md:grid-cols-2 gap-9 mb-10">
        {/* Durchlaufe aktive Nachrichten */}
        {activeMessages?.map((message) => {
          const sender =
            typeof message.sender === "string" ? null : message.sender;
          console.log(message);

          return (
            <div
              key={message._id}
              className="card p-4 bg-base-200 dark:bg-base-300 position-relative mt-4"
            >
              {/* Anzeige des Absenders und der Nachricht */}
              <h3 className="font-bold mb-2">
                {`${sender?.firstName} ${sender?.lastName ?? ""}`}
              </h3>
              <p className="mb-2">{message.message}</p>
              <div className="text-sm text-muted">
                {sender?.email && <div>{sender.email}</div>}
                {sender?.phone && <div>{sender.phone}</div>}
              </div>
              {/* Aktionsbuttons Ablehnen, E-Mail, Anrufen */}
              <div className="flex place-content-around gap-4 position-absolute bottom-0">
                <button
                  onClick={() => handleDecline(message._id)}
                  className={`btn-primary p-2 mt-4 text-white w-full font-semibold ${
                    confirmDecline === message._id
                      ? "bg-red-600"
                      : "bg-[#2B1B12]"
                  }`}
                >
                  {confirmDecline === message._id ? "Sicher?" : "Ablehnen"}
                </button>
                {/* Anzeige des E-Mail-Buttons, wenn E-Mail vorhanden */}
                {sender?.email && (
                  <>
                    <button
                      onClick={() =>
                        (window.location.href = `mailto:${sender.email}`)
                      }
                      className="btn-primary bg-[#2B1B12] p-2 mt-4 text-white w-full font-semibold"
                    >
                      E-Mail
                    </button>{" "}
                  </>
                )}
                /* Anzeige des Anruf-Buttons, wenn eine Telefonnummer vorhanden
                ist*/
                {sender?.phone && (
                  <>
                    <button
                      onClick={() =>
                        (window.location.href = `tel:${sender.phone}`)
                      }
                      className="btn-primary bg-[#2B1B12] p-2 mt-4 text-white w-full font-semibold"
                    >
                      Anrufen
                    </button>{" "}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </section>
      {/* Anzeige, wenn keine aktiven Nachrichten vorhanden sind */}
      {activeMessages.length === 0 && (
        <p className="text-center mb-10">
          😿Noch keine Anfragen für {animal.name} erhalten😿
        </p>
      )}
    </>
  );
}
