export default function HomePage() {
  return (
    <>
      <main className="p-4">
        <h2 className="mb-2 text-3xl">Wir lieben Tiere....</h2>
        <div className="p-5">Hier entsteht unsere Tiervermittlungsseite</div>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-3">
          <div className="border min-h-[500px] p-2">
            Ich bin eine Grid Kachel
          </div>
          <div className="border min-h-[500px] p-2">
            Ich bin eine Grid Kachel
          </div>
          <div className="border min-h-[500px] p-2">
            Ich bin eine Grid Kachel
          </div>
        </div>
      </main>
    </>
  );
}
