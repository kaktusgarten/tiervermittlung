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
        <h1 className="mt-10 mb-10">
          Wir suchen ein Zuhause {slug && `- Rubrik: ${slug.toUpperCase()}`}
        </h1>

        <section className="grid xl:grid-cols-3 md:grid-cols-2 gap-9 mb-10">
          {animals?.map((animal) => (
            <article
              key={animal._id}
              className="CARD rounded-2xl bg-[#c7c0ca] text-black flex flex-col"
            >
              <img
                src={animal.image_url[0]}
                alt="Tier sucht Zuhause"
                className="rounded-t-2xl object-cover h-[360px]"
              />

              <div className="p-5 font-medium">
                <div className="flex items-center mb-7">
                  <h3 className="text-1xl font-bold inline">
                    ❤ Ich bin {animal.name}
                  </h3>
                </div>

                <div className="mb-7 flex justify-between">
                  {/*  Rasse ################################  */}
                  <div className="flex">
                    <img
                      src="./img/icon-standort.svg"
                      className="bg-white rounded mr-2"
                    />
                    <span>Rasse: {animal.race}</span>
                  </div>

                  {/*  Alter ################################  */}
                  <div className="flex">
                    <img
                      src="./img/icon-standort.svg"
                      className="bg-white rounded mr-2"
                    />
                    <span>Alter: {animal.age} Jahre</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button className="rounded-md bg-[#2B1B12] text-white px-4 py-2 cursor-pointer">
                    Details
                  </button>
                  <strong>Standort: Berlin</strong>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
