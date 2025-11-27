import MainImage from "../components/MainImage";

export default function AboutPage() {
  return (
    <>
      <main className="">
        <div className="mb-10">
          <MainImage
            image="./img/Maeuse.jpg"
            headline="Über uns"
            textColor="white"
            text="Wir möchten helfen - Vermittlungsseite ohne kosten und kommerziellen Hintergedanken"
          />
        </div>
        <h1 className="mb-2">Über uns und unser Team</h1>
        <div className="p-5">
          <p className="px-5 pb-3">
            Wir sind vier Webentwickler-Studierende, die ihre Leidenschaft für
            Technik mit ihrer Liebe zu Tieren verbinden wollten. Im Rahmen
            unseres Abschlussprojekts haben wir diese Vermittlungsplattform ins
            Leben gerufen – aus einem einfachen Gedanken heraus: Tieren eine
            bessere Chance auf ein passendes Zuhause zu geben.
          </p>
          <p className="px-5 pb-3">
            Viele Tierheime vermitteln ihre Schützlinge ausschließlich regional.
            Gleichzeitig gibt es auch Privatpersonen, die aus
            verantwortungsvollen Gründen ein Tier in gute Hände abgeben möchten
            – sei es aufgrund veränderter Lebensumstände, gesundheitlicher
            Probleme oder anderer Notlagen. Für beide Seiten fehlt oft eine
            zentrale, übersichtliche und transparente Möglichkeit, potenzielle
            Interessenten zu erreichen.
          </p>
          <p className="px-5 pb-3">
            Genau hier möchten wir unterstützen. Unsere Plattform stellt eine
            Deutschlandkarte mit allen Standorten der eingetragenen Tiere bereit
            – egal ob sie aus einem Tierheim stammen oder von Privatpersonen
            eingestellt werden. Suchende sehen so auf einen Blick, wo sich ein
            Tier befindet, und können direkt Kontakt zu den jeweiligen
            Einstellern aufnehmen.
          </p>
          <p className="px-5 pb-3">
            Was uns besonders wichtig ist: Wir arbeiten ohne kommerzielle
            Interessen. Keine Werbecookies, keine versteckten Absichten, keine
            Einnahmen. Unser Projekt ist rein gemeinnützig gedacht. Wir möchten
            keine Profite generieren – wir möchten helfen, indem wir eine
            technische Lösung anbieten, die Tierheimen, Privatpersonen und
            Interessenten den Austausch erleichtern. Unsere Motivation ist es,
            Tieren und Menschen auf unkomplizierte Weise näherzubringen.
          </p>

          <p className="px-5 pb-10">
            Wenn wir damit auch nur einem Tier zu einem neuen, liebevollen
            Zuhause verhelfen können, hat sich unsere Arbeit gelohnt.
          </p>
          <p className="px-5 pb-3 font-semibold mb-20">
            Euer Team der Tierglückvermittlung
          </p>
        </div>
      </main>
    </>
  );
}
