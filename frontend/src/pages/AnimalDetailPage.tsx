import { useParams } from "react-router";
import AnimalMessageSend from "../components/AnimalMessageSend";
import { baseURL } from "../data";
import { useEffect, useState } from "react";
import DetailAnimal from "../components/DetailAnimal";
import { useAuth } from "../context";
import AnimalMessagesReceived from "../components/AnimalMessagesReceived";

export default function AnimalDetailPage() {
  const { user, signedIn } = useAuth();
  const { slug } = useParams<{ slug?: string }>();
  const [animal, setAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const res = await fetch(`${baseURL}/${slug}`);
        if (!res.ok) {
          throw new Error("Fehler beim Laden des Tieres");
        }
        const data = await res.json();
        setAnimal(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnimal();
  }, []);

  return (
    <>
      <main className="">
        <h1 className="mt-4 mb-10 pb-3">Unser Schützling {animal?.name}</h1>
        {animal ? (
          <>
            <DetailAnimal animal={animal} />

            {signedIn &&
              user?._id.toString() !== animal.owner?._id.toString() && (
                <AnimalMessageSend animal={animal} />
              )}
            {signedIn &&
              user?._id.toString() === animal.owner?._id.toString() && (
                <AnimalMessagesReceived animal={animal} />
              )}
          </>
        ) : (
          <p>Kein Tier gefunden.</p>
        )}
      </main>
    </>
  );
}
