import AnimalForm from "../components/AnimalForm";

export default function AddAnimalPage() {
  return (
    <>
      <main className="p-4">
        <h2 className="mb-2 text-3xl font-bold pt-5">Dein Tier vermitteln</h2>
        <p className="my-10 text-xl">
          Hier kannst Du die Informationen zu deinem Tier einstellen
        </p>
        <section className="grid md:grid-cols-2 gap-5">
          <div>
            <AnimalForm></AnimalForm>
          </div>
          <div>
            <h3 className="text-xl py-5 font-bold">
              Info zur Tier einstellung
            </h3>
            <p className="mb-5 text-xl">
              Fülle bitte alle Felder aus, damit wir dein Tier schnell und
              unkompliziert an einen Interessenten vermitteln können.
              <br></br>
              So kann ein Interessent schnell und übersichtlich einige Infos zu
              deinem Tier einsehen. Wenn Interesse besteht, läuft die weitere
              Kontaktaufnahme zwischen dem Einsteller und dem Interessenten
              persönlich, per Telefon oder per Mail ab.
            </p>
          </div>
        </section>
        <article className="py-10">
          <p className="pb-3">
            Uns liegt das Interesse deines Tieres am herzen und wir hoffen auf
            eine schnelle Vermittlung.
          </p>
          <p className="font-bold text-xl">Deine Team der Tiervermittlung</p>
        </article>
      </main>
    </>
  );
}
