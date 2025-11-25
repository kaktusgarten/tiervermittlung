export default function HomePage() {
  return (
    <>
      <main className="p-4">
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
        
      </main>
    </>
  );
}
