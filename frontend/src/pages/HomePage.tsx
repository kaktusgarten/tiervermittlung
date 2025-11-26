import MainImage from "../components/MainImage";

export default function HomePage() {
  return (
    <>
      <main className="">
        <div className="mb-10">
          <MainImage
            image="./img/mood-bild-1.png"
            headline="Die Tierglück Vermittlung"
            textColor="white"
            text="Finde ein neues Zuhause für dein Tier - Wir helfen!"
          />
        </div>

        <h1 className="mb-2">Wir lieben Tiere....</h1>
        <div className="p-5">Hier entsteht unsere Tiervermittlungsseite</div>

        <section className="grid xl:grid-cols-3 md:grid-cols-2 gap-3">
          <div className="border min-h-[500px] p-2">
            Ich bin eine Grid Kachel
          </div>

          <div className="border min-h-[500px] p-2">
            Ich bin eine Grid Kachel
          </div>

          <div className="border min-h-[500px] p-2">
            Ich bin eine Grid Kachel
          </div>
        </section>
        <div className="mt-10">
          <MainImage
            image="./img/Maeuse.jpg"
            headline="Helfen kann jeder, dass ein Tier glücklich ist"
            textColor="white"
            text="Finde ein neues Zuhause für dein Tier - Wir helfen!"
          />
        </div>
      </main>
    </>
  );
}
