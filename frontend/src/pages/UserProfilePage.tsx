import { useEffect, useState } from "react";
import FormChangeUserData from "../components/FormChangeUserData";
import ProfileMessagesReceived from "../components/ProfileMessagesReceived";
import ProfileMessagesSent from "../components/ProfileMessagesSent";
import { useAuth } from "../context";

export default function UserProfilePage() {
  const { user } = useAuth();
  const [sentMessages, setSentMessages] = useState<Message[]>([]);
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);

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
    fetchSentMessages();
    fetchReceivedMessages();
  }, []);
  return (
    <>
      <main className="p-4 mb-12">
        <h1 className="mt-6 mb-10">Mein Konto</h1>

        {/* Kontobox */}

        <div className="grid lg:grid-cols-3 gap-10 border rounded-2xl p-7 ">
          {/* MEINE KONTO DATAN ######################################### */}
          <div className="lg:col-span-1 col-span-2">
            <h3 className="mt-6">Meine Kontodaten:</h3>
            <FormChangeUserData />
          </div>
          <section className="col-span-2">
            {/* Interessenten Nachrichten ################################# */}
            <div className="">
              <h3 className="mb-4 my-6">Meine Tiere</h3>
              <section className="border p-2">
                <ProfileMessagesReceived />
              </section>
              {/* <AntwortenUebersicht /> */}
            </div>
            {/* Meine Anfragen ############################################ */}
            <div className="mb-10">
              <h3 className="mb-4 mt-6">Gesendete Anfragen:</h3>
              <section className="border p-2">
                {sentMessages.length > 0 ? (
                  sentMessages.map((message) => (
                    <div
                      key={message._id}
                      className="border-b last:border-0 p-2"
                    >
                      <ProfileMessagesSent
                        msg={message}
                        setSentMessages={setSentMessages}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-center mb-10">
                    😿Noch keine Anfragen gesendet😿
                  </p>
                )}
                {/* <AnfragenUebersicht /> */}
              </section>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
