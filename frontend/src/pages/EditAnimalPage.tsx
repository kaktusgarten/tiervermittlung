import { useNavigate, useParams } from "react-router";
import AnimalEditForm from "../components/AnimalEditForm";
import { useAuth } from "../context";
import { useEffect, useState } from "react";

export default function EditAnimalPage() {
  const { user, signedIn } = useAuth();
  const { slug } = useParams<{ slug?: string }>();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_AUTH_SERVER_URL}/animals/${slug}`);
        if (!res.ok) {
          throw new Error("Fehler beim Laden des Tieres");
        }
        const data = await res.json();
        setAnimal(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnimal();
  }, [slug]);
  useEffect(() => {
    if (user?._id.toString() !== animal?.owner?._id.toString() || !signedIn) {
      const timer = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timer);
    }
  }, [user, animal, signedIn]);
  return (
    <>
      <main className="mx-auto px-4 max-lg:text-center lg:w-3/5">
        {user?._id.toString() !== animal?.owner?._id.toString() || !signedIn ? (
          <p>
            Du bist nicht berechtigt, dieses Tier zu bearbeiten. Automatische
            Weiterleitung an die Frontpage...
          </p>
        ) : (
          <>
            <div className="bg-base-300 rounded-2xl p-4">
              <h1 className="mt-10 mb-4">{animal?.name} bearbeiten</h1>
              <p className="mt-10 mb-5 text-xl">
                Hier kannst Du die Informationen über dein Tier aktualisieren.
              </p>
              <p className="mb-5 text-xl">
                Bitte fülle alle Felder sorgfältig aus, um sicherzustellen, dass
                potenzielle Interessenten alle relevanten Informationen
                erhalten.
              </p>
            </div>
            <section className="flex flex-col gap-5">
              <div className="flex flex-row gap-4 p-4">
                {animal?.image_url.map((url, index) => (
                  <figure
                    key={index}
                    className={`w-1/${animal?.image_url.length} ${
                      index > 1 ? "max-sm:hidden" : ""
                    }`}
                  >
                    <img
                      src={url}
                      alt={animal?.name + index}
                      className="w-full rounded-2xl border-base-200 border"
                    />
                  </figure>
                ))}
              </div>

              <div className="">
                <AnimalEditForm animal={animal}></AnimalEditForm>
              </div>

              {/* <div>
              <h2 className="py-5 font-bold">Info´s zur Tiervermittlung</h2>
              <p className="mb-5 text-xl">
                Fülle bitte alle Felder aus, damit dein Tier schnell und
                unkompliziert ein schönes, neues Zuhause finden kann!
              </p>
              <p className="mb-5 text-xl">
                So kann ein Interessent schnell und übersichtlich einige Infos
                zu deinem Tier einsehen. Wenn Interesse besteht, läuft die
                weitere Kontaktaufnahme zwischen dir und dem Interessenten
                persönlich per Telefon oder E-Mail ab.
              </p>
              <img
                src="./img/tierglueck-vermittlung.png"
                title="Die Tierglückvermittlung"
                className="border rounded-2xl w-[100%]"
              ></img>
            </div> */}
            </section>
            {/* <article className="py-10">
            <p className="pb-3">
              Uns liegt das Interesse deines Tieres am herzen und wir hoffen auf
              eine schnelle Vermittlung.
            </p>
            <p className="font-bold text-xl">
              Dein Team der Tierglückvermittlung
            </p>
          </article> */}
          </>
        )}
      </main>
    </>
  );
}
