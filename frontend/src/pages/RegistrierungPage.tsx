import RegistryForm from "../components/RegistryForm";

export default function RegistrierungPage() {
  return (
    <>
      <main className="p-4">
        <h2 className="mb-2 text-3xl font-bold pt-5">Registrierung</h2>
        <p className="my-10 text-xl">
          Hier kannst Du dich registrieren um ein Tier auf unserer Seite
          einzustellen.
        </p>
        <section className="grid md:grid-cols-2 gap-5">
          <div>
            <RegistryForm></RegistryForm>
          </div>
          <div>
            <h3 className="text-xl py-5 font-bold">Info zur Registrierung</h3>
            <p className="mb-5 text-xl">
              Fülle bitte alle Felder aus, damit wir dein Tier schnell und
              unkompliziert mit deinen Kontaktinformationen vermitteln können.
              <br></br>
              Sollte sich ein Interessent melden, werden die E-Mail, Stadt und
              Name des Interessenten an dich weiter gegeben und sind in deinem
              Kontobereich einsehbar.
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
