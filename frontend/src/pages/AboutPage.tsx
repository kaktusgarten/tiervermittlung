import MainImage from "../components/MainImage";
import { Link } from "react-router-dom";
import MainImageHomePage from "../components/MainImageHomePage";

export default function AboutPage() {
  return (
    <>
      <main className="pb-20">
        {/* Hero Bild */}
        <div className="mb-10">
          <MainImage
            image="./img/Maeuse.jpg"
            headline="Über uns"
            textColor="white"
            text="Vermittlung mit Herz"
          />
        </div>

        {/* Team Intro */}
        <section className="max-w-6xl mx-auto mb-16 mt-6">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Über uns & unser Projekt
          </h1>

          <div className="space-y-6 leading-relaxed bg-[#bbb3be] p-12 rounded-xl shadow-md mt-10">
            <p>
              Wir sind vier Webentwickler-Studierende, die ihre Leidenschaft für
              Technik mit ihrer Liebe zu Tieren verbinden wollten. Im Rahmen
              unseres Abschlussprojekts haben wir diese Vermittlungsplattform
              ins Leben gerufen – aus dem Wunsch heraus, Tieren eine bessere
              Chance auf ein liebevolles Zuhause zu geben.
            </p>

            <p>
              Viele Tierheime vermitteln nur regional. Gleichzeitig gibt es
              Privatpersonen, die aus verantwortungsvollen Gründen ein Tier
              abgeben müssen. Doch beiden Seiten fehlt oft eine zentrale und
              transparente Möglichkeit, passende Interessent*innen zu erreichen.
            </p>

            <p>
              Genau hier setzen wir an. Unsere Plattform zeigt eine
              Deutschlandkarte mit allen eingetragenen Tieren – egal ob aus
              einem Tierheim oder von Privat. So finden Suchende schneller und
              einfacher den passenden Vierbeiner.
            </p>

            <p>
              Was uns wichtig ist: Wir arbeiten ohne kommerzielle Absichten.
              Keine Werbung, keine Gebühren, keine versteckten Interessen.
              Unsere Motivation ist rein gemeinnützig – wir möchten helfen.
            </p>

            <p className="font-semibold mt-10">
              Wenn wir auch nur einem Tier zu einem neuen Zuhause verhelfen, hat
              sich unsere Arbeit gelohnt. ❤️
            </p>

            <p className="font-semibold text-right">
              – Euer Team der Tierglückvermittlung
            </p>
          </div>
        </section>

        {/* Zeitstrahl / Steps */}
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
        </section>
      </main>
      <section className="">
        <MainImageHomePage
          image="./img/mood-bild-1.png"
          headline=""
          textColor="white"
          text=""
        />
      </section>
    </>
  );
}
