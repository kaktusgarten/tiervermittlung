import AnimalForm from "../components/AnimalForm";

export default function AddAnimalPage() {
  return (
    <>
      <main className="">
        <h1 className="mt-10 mb-4">Registrier dein Tier</h1>
        <p className="my-10 text-xl">
          Hier kannst Du die Informationen zu deinem Tier einstellen
        </p>
        <section className="grid md:grid-cols-2 gap-5">
          <div>
            <AnimalForm></AnimalForm>
          </div>
          <div>
            <h2 className="py-5 font-bold">Info´s zur Tiervermittlung</h2>
            <p className="mb-5 text-xl">
              Fülle bitte alle Felder aus, damit wir dein Tier schnell und
              unkompliziert an einen Interessenten vermitteln können.
              <br></br>
              So kann ein Interessent schnell und übersichtlich einige Infos zu
              deinem Tier einsehen. Wenn Interesse besteht, läuft die weitere
              Kontaktaufnahme zwischen dem Einsteller und dem Interessenten
              persönlich, per Telefon oder per Mail ab.
            </p>
            <img
              src="./img/tierglueck-vermittlung.png"
              title="Die Tierglückvermittlung"
              className="border rounded-2xl w-[100%]"
            ></img>
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
