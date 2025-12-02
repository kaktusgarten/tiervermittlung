
import { Link } from "react-router";
export default function StepsToAdopt() {
  return (
    <section className="mx-auto px-6 mt-24">
      <h2 className="font-bold text-center mb-10">Dein Weg zur Adoption</h2>

      {/* Steps */}
      <ul
        className="steps steps-vertical lg:steps-horizontal w-full mb-12"
        style={{
          ["--tw-step-color" as any]: "#3abf73", // Farbe der Kreise
          ["--tw-step-border" as any]: "#3abf73", // Farbe der Linie
        }}
      >
        <li className="step step-primary">Tier finden</li>
        <li className="step step-primary">Kontakt aufnehmen</li>
        <li className="step step-primary">Adoption</li>
      </ul>

      {/* Texte unter Steps */}
      <article>
        <div className="grid lg:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="font-semibold mb-2 text-base lg:text-lg whitespace-nowrap">
              1. Tier finden
            </h3>

            <p className="text-sm opacity-80 leading-relaxed">
              Durchstöbere unsere{" "}
              <Link
                to="/tier-suchen"
                className="text-[#1D3349] underline hover:text-[#594856]"
              >
                Vermittlungsseite
              </Link>{" "}
              und entdecke Tiere aus ganz Deutschland.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-base lg:text-lg whitespace-nowrap">
              2. Kontakt aufnehmen
            </h3>

            <p className="text-sm opacity-80 leading-relaxed">
              Melde dich direkt beim Tierheim oder der Privatperson – ohne
              Zwischenstelle.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-base lg:text-lg whitespace-nowrap">
              3. Adoption
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Wenn alles passt – willkommen in deiner neuen Familie! 🐾
            </p>
          </div>
        </div>
      </article>
    </section>
  )
}
