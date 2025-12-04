import { NavLink } from "react-router";
export default function Footer() {
  return (
    <>
      <footer className="w-full">
        <section className="bg-[#594856] py-4 min-h-[20px] text-white">
          <div className="container m-auto">
            <div className="grid md:grid-cols-[150px_1fr_1fr_1fr] gap-5">
              <div className="flex max-md:justify-center justify-start">
                <img
                  src="/img/logo-rund-weiss.png"
                  className="w-[100px] object-contain m-7"
                />
              </div>

              {/* Spalte 1 #################################### */}
              <section className="p-4 sm:py-4 py-4">
                <h3 className="text-white">Wir lieben Tiere</h3>
                <span>
                  Da wir dieses Angebot aus reiner Tierliebe, ohne kommerziellen
                  Hintergedanken betreiben, freuen wir uns gerne über jede
                  Mithilfe.
                </span>
              </section>

              {/* Spalte 2 #################################### */}
              <section className="p-4 sm:py-4 py-4">
                <h3 className="text-white">Websites zum Thema:</h3>
                <span>
                  <ul className="list-[disc] pl-5">
                    <li>
                      <a
                        href="https://www.bremer-tierschutzverein.de/tiervermittlung/unsere-tiere.html"
                        title="Bremer Tierschutzverein e.V."
                        target="_blank"
                        className="underline italic"
                      >
                        Tierschutz Bremen
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://deguhilfe-sued.de/"
                        title="Deguhilfe Süd"
                        target="_blank"
                        className="underline italic"
                      >
                        Deguhilfe Süd
                      </a>
                    </li>
                  </ul>
                </span>
              </section>

              {/* Spalte 3 #################################### */}
              <section className="p-4 sm:py-4 py-4">
                <h3 className="text-white">Kontakt</h3>
                <span>
                  Gerne könnt Ihr uns eine Nachricht oder andere Infos über die
                  Kontaktadresse im Impressum zukommen lassen.
                </span>
              </section>
            </div>
          </div>
        </section>

        {/* FOOTER - GANG UNTEN ############################### */}
        <section className="bg-[#161814] px-4 py-4">
          {/* <div className="container m-auto grid grid-cols-[1fr_auto] gap-4"> */}
          {/* <div className="p-2"> */}
          <nav className="">
            <ul className="flex max-[345px]:flex-col gap-5 text-white flex-wrap justify-center items-center">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/tier-suchen">Tierfinder</NavLink>
              </li>
              <li>
                <NavLink to="/about">Über uns</NavLink>
              </li>
              <li>
                <NavLink to="/impressum">Impressum</NavLink>
              </li>
              <li>© 2025</li>
            </ul>
          </nav>
          {/* </div> */}
          {/* </div> */}
          {/* <div className="p-2 text-white">© 2025</div>*/}
        </section>
      </footer>
    </>
  );
}
