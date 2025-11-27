import FormChangeUserData from "../components/FormChangeUserData";

export default function UserProfilePage() {
  return (
    <>
      <main className="p-4 mb-12">
        <h2 className="mt-6 mb-10 text-3xl">
          Meine Kontodaten und Tieranfragen
        </h2>

        {/* Kontobox */}

        <div className="grid md:grid-cols-3 gap-10 border rounded-2xl p-7 ">
          {/* MEINE KONTO DATAN ######################################### */}
          <div className="md:col-span-1 col-span-2">
            <h3 className="text-xl mt-6">Meine Kontodaten:</h3>
            <FormChangeUserData />
          </div>
          <section className="col-span-2">
            {/* Meine Anfragen ############################################ */}
            <div className="mb-10">
              <h3 className="mb-4 text-xl mt-6">
                Meine gestellten Anfragen zur Tieradoption:
              </h3>
              <section className="border p-2">
                Folgende Mitteilungen habe ich gesendet
                {/* <AnfragenUebersicht /> */}
              </section>
            </div>

            {/* Interessenten Nachrichten ################################# */}
            <div className="">
              <h3 className="mb-4 text-xl my-6">
                Interessenten für mein eingestelltes Tier:
              </h3>
              <section className="border p-2">
                Folgende Personen haben ihnen geschrieben
              </section>
              {/* <AntwortenUebersicht /> */}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
