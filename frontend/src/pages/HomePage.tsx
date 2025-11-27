import CardAnimal from "../components/CardAnimal";
import MainImageHomePage from "../components/MainImageHomePage";
import MainImage from "../components/MainImage";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [animals, setAnimals] = useState<Animal[]>();

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
        {/* HEADER Image ############################################ */}
        <section className="mb-10">
          <MainImageHomePage
            image="./img/mood-bild-1.png"
            headline="Die Tierglück Vermittlung"
            textColor="white"
            text="Finde ein neues Zuhause für dein Tier - Wir helfen!"
          />
        </section>

        {/* Einleigungstext ########################################## */}
        <section>
          <h2 className="mb-2 font-semibold">
            Wir lieben Tiere – und wir möchten helfen!
          </h2>
          <div className="flex gap-4 p-6 my-6 bg-[#594856] text-white rounded-2xl italic">
            <div className="">
              <img
                src="./img/logo-rund-weiss.png"
                className="w-[80px] object-contain"
              />
            </div>
            <p className="flex-1 flex items-center">
              Tiervermittlung ohne Werbung, ohne Gewinnabsicht, einfach aus
              Überzeugung.
              <br />
              Diese Seite entsteht aus Herzblut und dem Wunsch, Tieren ein
              passendes Zuhause zu schenken.
            </p>
          </div>
        </section>

        {/* AKTUELLE VERMITTLUNGSANFRAGEN ########################### */}
        <section>
          <h2 className="pb-10 pt-10">Neueste Vermittlungsanfragen</h2>
          <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-9 mb-10">
            {!animals || animals.length === 0 ? (
              <h2>Keine Tiere gefunden.</h2>
            ) : (
              animals
                .slice(0, 3)
                .map((animal, index) => (
                  <CardAnimal key={animal._id || index} animal={animal} />
                ))
            )}
          </div>
        </section>

        {/* FOOTER Image ############################################ */}
        <section className="mt-20">
          <MainImage
            image="./img/Maeuse.jpg"
            headline="Helfen kann jeder, damit ein Tier glücklich ist"
            textColor="white"
            text="Finde ein neues Zuhause für dein Tier - Wir helfen!"
          />
        </section>
      </main>
    </>
  );
}
