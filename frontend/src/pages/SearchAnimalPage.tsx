import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function SearchAnimalPage() {
  const [animals, setAnimals] = useState<Animal[]>();

  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/animals`
        );
        const data = await res.json();
        setAnimals(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <>
      <main className="">
        <h1 className="mt-10 mb-4">
          Suchseite - Finde Dein neues Haustier - {slug}
        </h1>
        <section className="grid xl:grid-cols-3 md:grid-cols-2 gap-3 mb-2">
          {animals?.map((animal) => (
            <article key={animal._id} className="border min-h-[500px] p-2">
              <h2 className="mb-4">{animal.name}</h2>
              <img
                src={animal.image_url[0]}
                title=""
                className="w-full object-cover h-[340px] border mb-4"
              ></img>
              <p>Tierart: </p>
              <p>Rasse: {animal.race}</p>
              <p>Alter: {animal.age}</p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
