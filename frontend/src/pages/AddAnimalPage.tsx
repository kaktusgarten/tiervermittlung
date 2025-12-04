import AnimalForm from "../components/AnimalForm";

export default function AddAnimalPage() {
  return (
    <>
      <main className="flex flex-col m-auto">
        {/* <section className="grid lg:grid-cols-2 gap-5"> */}
        <section className="flex flex-col-reverse lg:flex-row gap-5 mx-auto">
          <div className="max-lg:items-center max-lg:justify-center max-lg:text-center lg:w-2/3">
            <div className="bg-base-300 rounded-2xl p-4">
              <h1 className="mt-10 mb-4">Registrier dein Tier</h1>
              <p className="my-10 text-xl">
                Hier kannst Du die Informationen über dein Tier einstellen
              </p>
            </div>
            <AnimalForm></AnimalForm>
          </div>
          <div className="lg:w-1/3 bg-base-300 rounded-2xl p-4">
            <div className="bg-base-300 rounded-2xl p-4 max-lg:text-center">
              <h2 className="mt-10 mb-5 font-bold">
                Infos zur Tiervermittlung
              </h2>
              <p className="mb-5 text-xl">
                Fülle bitte alle Felder aus, damit wir dein Tier schnell und
                unkompliziert an einen Interessenten vermitteln können.
                <br></br>
                So kann ein Interessent schnell und übersichtlich einige Infos
                zu deinem Tier einsehen. Wenn Interesse besteht, läuft die
                weitere Kontaktaufnahme zwischen dem Einsteller und dem
                Interessenten persönlich, per Telefon oder per Mail ab.
              </p>
            </div>
            <img
              src="./img/tierglueck-vermittlung.png"
              title="Die Tierglückvermittlung"
              className="border rounded-2xl w-full"
            ></img>
            <article className="py-10 bg-base-300 rounded-2xl p-4 max-lg:text-center">
              <p className="pb-3">
                Uns liegt das Interesse deines Tieres am herzen und wir hoffen
                auf eine schnelle Vermittlung.
              </p>
              <p className="font-bold text-xl">
                Deine Team der Tiervermittlung
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
