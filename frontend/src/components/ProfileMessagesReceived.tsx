import { useState } from "react";

export default function ProfileMessagesReceived({
  msg,
  setReceivedMessages,
  animalId,
}: {
  msg: Message;
  setReceivedMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  animalId: string;
}) {
  const [confirmDecline, setConfirmDecline] = useState<string | null>(null);

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
      setReceivedMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== messageId)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setConfirmDecline(null);
    }
  }

  const sender = typeof msg.sender === "string" ? null : msg.sender;
  const animal = typeof msg.animal === "string" ? null : msg.animal;

  return (
    <>
      {animal?._id === animalId && (
        <section className="grid grid-cols-1 gap-9 mb-10">
          <div className="flex flex-col gap-1 text-sm text-muted my-6">
            <h3 className="font-bold">
              {`${sender?.firstName} ${sender?.lastName}`}
            </h3>
            <p className="mb-2">{msg.message}</p>
            <div className="flex max-lg:flex-col flex-row gap-5 mb-2 text-sm text-muted">
              <div>
                <span className="font-bold">E-Mail:</span>
                <span> {sender?.email}</span>
              </div>
              {sender?.phone ? (
                <>
                  <div>
                    <span className="font-bold">Telefon:</span>
                    <span> {sender?.phone}</span>
                  </div>
                </>
              ) : null}
            </div>
            <div className="flex max-md:flex-col place-content-around gap-x-2 position-absolute bottom-0">
              {sender?.email && (
                <>
                  <button
                    onClick={() =>
                      (window.location.href = `mailto:${sender.email}`)
                    }
                    className="btn-primary bg-[#2B1B12] p-2 mt-4 text-white w-full font-semibold cursor-pointer"
                  >
                    E-Mail
                  </button>{" "}
                </>
              )}
              {sender?.phone && (
                <>
                  <button
                    onClick={() =>
                      (window.location.href = `tel:${sender.phone}`)
                    }
                    className="btn-primary bg-[#2B1B12] p-2 mt-4 text-white w-full font-semibold cursor-pointer"
                  >
                    Anrufen
                  </button>{" "}
                </>
              )}
              <button
                onClick={() => handleDecline(msg._id)}
                className={`btn-primary p-2 mt-4 text-white w-full font-semibold cursor-pointer ${
                  confirmDecline === msg._id ? "bg-red-600" : "bg-[#57241e]"
                }`}
              >
                {confirmDecline === msg._id ? "Sicher?" : "Ablehnen"}
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
