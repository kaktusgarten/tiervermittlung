import { useEffect, useState } from "react";
import { useAuth } from "../context";
import { Link } from "react-router";

export default function ProfileMessagesReceived() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [confirmDecline, setConfirmDecline] = useState<string | null>(null);
  const { user } = useAuth();
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/messages/owner/${user?._id}`
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

  const activeMessages = messages.filter((msg) => msg.status === "active");

  return (
    <>
      <section className="grid grid-cols-1 gap-9 mb-10">
        {activeMessages?.map((message) => {
          const sender =
            typeof message.sender === "string" ? null : message.sender;
          const animal =
            typeof message.animal === "string" ? null : message.animal;

          return (
            <article
              key={message._id}
              className="card p-4 bg-base-300 position-relative mt-4"
            >
              <div className="flex flex-row text-sm text-muted gap-5 max-md:flex-col justify-center">
                <div className="flex flex-col text-sm text-muted">
                  <h3 className="">{animal?.name}</h3>
                  <figure className=" w-40 h-40 max-md:w-full">
                    <Link to={`/details/${animal?._id}`}>
                      <img
                        src={
                          animal?.image_url?.[0] || "/placeholder-animal.png"
                        }
                        alt={animal?.name || "Tierbild"}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </figure>
                  <div className="flex-row gap-2 ">
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
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-sm text-muted my-6 lg:max-w-2/3">
                  <h3 className="font-bold">
                    {`${sender?.firstName} ${sender?.lastName}`}
                  </h3>
                  <p className="mb-2">{message.message}</p>
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
                  <div className="flex max-md:flex-col place-content-around gap-2 max-lg:gap-2 position-absolute bottom-0">
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
                    <button
                      onClick={() => handleDecline(message._id)}
                      className={`btn-primary p-2 mt-4 text-white w-full font-semibold ${
                        confirmDecline === message._id
                          ? "bg-red-600"
                          : "bg-[#57241e]"
                      }`}
                    >
                      {confirmDecline === message._id ? "Sicher?" : "Ablehnen"}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
      {activeMessages.length === 0 && (
        <p className="text-center mb-10">😿Noch keine Anfragen erhalten😿</p>
      )}
    </>
  );
}
