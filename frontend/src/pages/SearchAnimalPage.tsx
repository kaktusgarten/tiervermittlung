import { useEffect, useState } from "react";
import { useParams } from "react-router";

import MainImage from "../components/MainImage";
import CardAnimal from "../components/CardAnimal";

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
        <h1 className="mt-10 mb-10">
          Wir suchen ein Zuhause {slug && `- Rubrik: ${slug.toUpperCase()}`}
        </h1>

        <section className="grid xl:grid-cols-3 md:grid-cols-2 gap-9 mb-10">
          {animals?.map((animal) => (
            <CardAnimal animal={animal}></CardAnimal>
          ))}
        </section>

        <div className="mt-10">
          <MainImage
            image="./img/Maeuse.jpg"
            headline="Tier vermitteln, Tier ein zu Hause geben"
            textColor="white"
            text="Finde ein neues Zuhause für dein Tier - Wir helfen!"
          />
        </div>
      </main>
    </>
  );
}
