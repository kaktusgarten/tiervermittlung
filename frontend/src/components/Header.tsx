import { NavLink } from "react-router";
import { useEffect } from "react";
import LoginModal from "./LoginModal";
export default function Header() {
  const categories = [{ _id: "1", name: "Hund" }];

  const logout = () => {
    alert("abmelden.....");
  };

  useEffect(() => {
    // FETCH CATEGORIES (immer)
    // const fetchCategories = async () => {
    //   try {
    //     const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
    //     const data = await res.json();
    //     setCategories(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchCategories();

    // Menu schließt alle Submenüs bei Klick:
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a")) {
        document
          .querySelectorAll("details[open]")
          .forEach((d) => d.removeAttribute("open"));
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <header className="py-4 sticky top-0 bg-[#1D3349] text-white border-b z-100 -translate-y-2 shadow-[0_0_20px_#000] border-[#000]">
        <div className="container m-auto">
          {/* HEADER INHALT */}
          <div className="overflow-auto min-h-[40px]">
            <div className="grid md:grid-cols-3">
              <div className="NAVI-1">
                <nav>
                  <ul className="menu menu-horizontal bg-[#1D3349]  absolute">
                    <li>
                      <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                      <details>
                        <summary>Tier suchen</summary>
                        <ul className="bg-[#fff] text-black font-semibold border border-[#1D3349] -translate-y-1 shadow-[4px_4px_8px_#c7c0ca]">
                          <li>
                            <NavLink to="/tier-suchen">
                              Alle&nbsp;Tiere&nbsp;zeigen
                            </NavLink>
                          </li>
                          {categories?.map((cat) => (
                            <li key={cat._id}>
                              <NavLink to={`/tier-suchen/${cat._id}`}>
                                {cat.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details>
                        <summary>Über uns</summary>
                        <ul className="bg-[#fff] text-black font-semibold border border-[#1D3349] -translate-y-1 shadow-[4px_4px_8px_#c7c0ca]">
                          <li>
                            <NavLink to="/about">Über uns</NavLink>
                          </li>
                          <li>
                            <NavLink to="/about">Impressum</NavLink>
                          </li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="NAVI-2">
                <nav>
                  <ul className="menu menu-horizontal bg-[#1D3349] lg:mb-64  absolute">
                    <li>
                      <NavLink to="/tier-einstellen">Tier vermitteln</NavLink>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="NAVI-3">
                <nav>
                  <ul className="menu menu-horizontal bg-[#1D3349]  lg:mb-64  absolute">
                    <li>
                      <NavLink to="/mein-konto">Meine Kontodaten</NavLink>
                    </li>
                    {"anmelden" === "abmelden" ? (
                      <li>
                        <a onClick={logout}>Abmelden</a>
                      </li>
                    ) : (
                      <li>
                        <NavLink to="/login">Anmelden</NavLink>
                      </li>
                    )}

                    <li>
                      <NavLink to="/registrierung">Registrieren</NavLink>
                    </li>

                    {/* {userData?.roles?.[0] === "admin" && (
                  <li>
                    <NavLink to="/admin-bereich" className="text-[orange]">
                      Admin Bereich
                    </NavLink>
                  </li>
                )} */}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
