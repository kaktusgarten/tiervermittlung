import MainImage from "../components/MainImage";

export default function ImpressumAgbPage() {
  return (
    <>
      <MainImage
        image="./img/Maeuse.jpg"
        headline="Impressum - AGB´s - Datenschutz"
        textColor="white"
        text="Info´s zu unserem Tiervermittlungsprojekt"
      />
      <main className="lg:px-20">
        {/* Impressum ############################################################ */}
        <div className="">
          <section className="mb-8 pt-10">
            <h1 className="font-extrabold">Impressum</h1>
            <p className="mt-2">Angaben gemäß § 5 TMG</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold ">Projekt / Betreiber</h2>
              <address className="not-italic mt-2  ">
                <p>Tiervermittlung – Tierglückvermittlung</p>
                <p>c/o Ansprechpartner / Gründerteam</p>
                <p>WDG 24 Tiervermittlungsteam</p>
                <p>Musterstraße 1</p>
                <p>12345 Musterstadt</p>
                <p>Deutschland</p>
              </address>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Kontakt</h2>
              <div className="mt-2 ">
                <p>
                  E-Mail:{" "}
                  <a
                    href="mailto:info@tiervermittlung-projekt.de"
                    className="text-blue-600 underline"
                  >
                    info@tiervermittlung-projekt.de
                  </a>
                </p>
                <p className="mt-1">Telefon: (optional eintragen)</p>
                <p className="mt-1">
                  Website:{" "}
                  <a href="/" className="text-blue-600 underline">
                    https://deine-domain.de
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold ">
              Verantwortlich für den Inhalt
            </h2>
            <p className="mt-2  ">
              WDG-24 Tiervermittlungsteam
              <br />
              Musterstraße 1<br />
              12345 Musterstadt
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold ">Haftung für Inhalte</h2>
            <p className="mt-2  ">
              Als Betreiber dieser Website sind wir gemäß § 7 Abs. 1 TMG für
              eigene Inhalte verantwortlich. Nach §§ 8–10 TMG sind wir jedoch
              nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die
              auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur
              Entfernung oder Sperrung der Nutzung von Informationen nach
              allgemeinen Gesetzen bleiben unberührt. Eine Haftung ist erst ab
              dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
              möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen
              werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold ">Haftung für Links</h2>
            <p className="mt-2  ">
              Unsere Website enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              verantwortlich. Bei bekannt werdenden Rechtsverstößen werden
              derartige Links umgehend entfernt.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold ">Urheberrecht</h2>
            <p className="mt-2  ">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge
              Dritter sind als solche gekennzeichnet. Die Vervielfältigung,
              Bearbeitung oder Verbreitung außerhalb der Grenzen des
              Urheberrechts bedarf der schriftlichen Zustimmung der jeweiligen
              Autoren.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">
              Datenspeicherung &amp; Vermittlungsablauf (Kurzinfo)
            </h2>
            <p className="mt-2  ">
              Benutzerinnen und Benutzer der Website erklären sich damit
              einverstanden, dass die von ihnen angegebenen personenbezogenen
              Daten (Name, Adresse, Kontaktinformationen) im Rahmen der
              Tiervermittlung verarbeitet und gespeichert werden. Die Daten
              werden ausschließlich genutzt, um Vermittler und Interessenten
              zuzuordnen, Erstkontakte herzustellen und den Vermittlungsprozess
              technisch durchzuführen. Eine Weitergabe an Dritte erfolgt nur,
              sofern sie für die Vermittlung erforderlich ist.
            </p>
            <p className="mt-2  ">
              Bitte beachten Sie unsere{" "}
              <a href="/datenschutz" className="text-blue-600 underline">
                Datenschutzerklärung
              </a>{" "}
              für detaillierte Informationen zur Datenverarbeitung,
              Rechtsgrundlage, Speicherdauer und Ihren Rechten.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold ">
              Keine kommerzielle Nutzung
            </h2>
            <p className="mt-2  ">
              Diese Website wird ausschließlich als nicht-kommerzielles Projekt
              von angehenden Webentwicklern betrieben. Es bestehen keine
              Gewinnerzielungsabsichten.
            </p>
          </section>
        </div>

        {/* AGBs ############################################################ */}

        <div className="">
          <section className="mb-8 pt-10">
            <h1 className="font-extrabold mb-10">
              Allgemeine Geschäftsbedingungen (AGB)
            </h1>
            <p className="mt-2">
              für die Nutzung der Tiervermittlungs-Website (nicht-kommerzielles
              Projekt)
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">1. Geltungsbereich</h2>
            <p className="mt-2">
              Diese Allgemeinen Geschäftsbedingungen regeln die Nutzung der
              nicht-kommerziellen Tiervermittlungs-Website durch alle
              registrierten Nutzerinnen und Nutzer. Mit der Registrierung oder
              Nutzung der Website akzeptieren Sie diese AGB.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">2. Zweck der Website</h2>
            <p className="mt-2 ">
              Die Website dient ausschließlich der Vermittlung von Tieren
              zwischen Privatpersonen, Vereinen oder anderen Vermittelnden und
              Interessenten. Die Betreiber verfolgen keine kommerziellen Ziele
              und erheben keine Vermittlungsgebühren.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">
              3. Registrierung und Benutzerkonto
            </h2>
            <p className="mt-2">
              Für die Nutzung bestimmter Funktionen (z.B. Kontaktaufnahme,
              Inserate einstellen) ist eine Registrierung erforderlich. Die
              Nutzer verpflichten sich, wahrheitsgemäße Angaben zu machen und
              ihre Daten aktuell zu halten. Die Betreiber behalten sich vor,
              Benutzerkonten bei Verstößen zu sperren.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">
              4. Einstellen von Tieranzeigen
            </h2>
            <p className="mt-2">
              Vermittelnde dürfen nur Tiere einstellen, für die sie
              vermittelungsberechtigt sind. Die Angaben müssen vollständig und
              korrekt sein. Bilder dürfen nur hochgeladen werden, wenn die
              Rechte dafür vorliegen und keine Personen erkennbar abgebildet
              sind.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">5. Datenschutz</h2>
            <p className="mt-2">
              Zur Vermittlung werden personenbezogene Daten gespeichert,
              darunter Namen, Adressen und Kontaktinformationen. Diese Daten
              dienen ausschließlich der Tiervermittlung und der technischen
              Abwicklung. Eine Weitergabe findet nur statt, wenn sie für die
              Vermittlung notwendig ist. Weitere Details sind der
              Datenschutzerklärung zu entnehmen.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">
              6. Nutzungspflichten der Benutzer
            </h2>
            <p className="mt-2">
              Nutzer verpflichten sich, die Website nur für legale Zwecke zu
              verwenden, keine falschen Angaben zu machen und keine Inhalte
              hochzuladen, die gegen geltendes Recht verstoßen oder Rechte
              Dritter verletzen.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">7. Haftungsausschluss</h2>
            <p className="mt-2">
              Die Betreiber übernehmen keine Garantie für die Richtigkeit der
              Angaben in Tieranzeigen und keine Haftung für Schäden, die im
              Rahmen der Tiervermittlung entstehen. Die vermittelnden Parteien
              sind selbst für die Durchführung und Prüfung der Vermittlung
              verantwortlich.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">8. Beendigung der Nutzung</h2>
            <p className="mt-2">
              Nutzer können ihr Konto jederzeit löschen lassen. Die Betreiber
              behalten sich vor, den Zugang zu sperren oder Inhalte zu
              entfernen, wenn ein Verstoß gegen diese AGB vorliegt.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">9. Änderungen der AGB</h2>
            <p className="mt-2">
              Die Betreiber behalten sich vor, diese AGB jederzeit anzupassen.
              Nutzer werden über wesentliche Änderungen informiert. Die Nutzung
              der Website nach Änderung gilt als Zustimmung.
            </p>
          </section>
        </div>

        {/* Datenschutzerklärung ############################################################ */}
        <div className="pb-10">
          <section className="mb-8 pt-10">
            <h1 className="font-extrabold">Datenschutzerklärung</h1>
            <p className="mt-2">Informationen zum Datenschutz gemäß DSGVO</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">1. Verantwortliche Stelle</h2>
            <p className="mt-2">
              Verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten
              ist:
              <br />
              WDG-24 Tiervermittlungsteam
              <br />
              Musterstraße 1<br />
              12345 Musterstadt
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">
              2. Art der verarbeiteten Daten
            </h2>
            <p className="mt-2">
              Im Rahmen der Nutzung unserer Tiervermittlungs-Website verarbeiten
              wir folgende personenbezogene Daten:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>Name</li>
              <li>Adresse</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer (optional)</li>
              <li>Daten zu Tieranzeigen (Beschreibung, Bilder, Standort)</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">
              3. Zweck der Datenverarbeitung
            </h2>
            <p className="mt-2">
              Ihre Daten werden ausschließlich für folgende Zwecke verwendet:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>Durchführung des Vermittlungsprozesses</li>
              <li>
                Herstellung eines Erstkontakts zwischen Vermittlern und
                Interessenten
              </li>
              <li>Darstellung und Verwaltung Ihrer Tieranzeigen</li>
              <li>Kommunikation im Rahmen der Tiervermittlung</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">4. Rechtsgrundlagen</h2>
            <p className="mt-2">
              Die Verarbeitung Ihrer Daten basiert auf folgenden
              Rechtsgrundlagen gemäß DSGVO:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>Art. 6 Abs. 1 lit. a – Einwilligung</li>
              <li>
                Art. 6 Abs. 1 lit. b – Vertragserfüllung bzw. vorvertragliche
                Maßnahmen
              </li>
              <li>
                Art. 6 Abs. 1 lit. f – berechtigtes Interesse (Betrieb der
                Website)
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">5. Weitergabe von Daten</h2>
            <p className="mt-2">
              Eine Weitergabe personenbezogener Daten an Dritte erfolgt
              ausschließlich, wenn dies für die Tiervermittlung erforderlich ist
              – etwa an Vermittler oder Interessenten, um den Erstkontakt
              herzustellen.
            </p>
            <p className="mt-2">
              Eine darüber hinausgehende Weitergabe findet nicht statt.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">6. Speicherdauer</h2>
            <p className="mt-2">
              Ihre Daten werden nur so lange gespeichert, wie dies für den
              Vermittlungsprozess, die Bereitstellung des Benutzerkontos oder
              gesetzliche Vorgaben erforderlich ist.
            </p>
            <p className="mt-2">
              Nach Löschung Ihres Kontos werden Ihre personenbezogenen Daten
              innerhalb von 30 Tagen vollständig entfernt, sofern keine
              gesetzlichen Aufbewahrungspflichten bestehen.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">
              7. Ihre Rechte als Betroffene
            </h2>
            <p className="mt-2">Sie haben jederzeit das Recht auf:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Auskunft über gespeicherte Daten</li>
              <li>Berichtigung unrichtiger Daten</li>
              <li>Löschung Ihrer Daten</li>
              <li>Einschränkung der Verarbeitung</li>
              <li>Widerspruch gegen die Verarbeitung</li>
              <li>Datenübertragbarkeit</li>
            </ul>
            <p className="mt-2">
              Zur Ausübung dieser Rechte kontaktieren Sie uns bitte unter:
              info@tiervermittlung-projekt.de
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">
              8. Cookies & technische Daten
            </h2>
            <p className="mt-2">
              Für den Betrieb dieser Website verwenden wir ausschließlich
              technisch notwendige Cookies und Server-Logfiles, die automatisch
              erfasst werden (z.B. IP-Adresse, Browsertyp, Uhrzeit des
              Zugriffs). Diese dienen ausschließlich der Sicherheit und
              Funktionalität.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">
              9. Änderungen dieser Datenschutzerklärung
            </h2>
            <p className="mt-2">
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf
              anzupassen. Es gilt stets die aktuelle Version, die auf dieser
              Seite veröffentlicht ist.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
