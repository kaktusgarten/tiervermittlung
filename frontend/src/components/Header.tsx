import { useNavigate, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../context";
import DarkThemeSchalter from "./DarkThemeSchalter";
//import LoginModal from "./LoginModal";
export default function Header() {
  // const categories = [{ categoryName: "Hunde", name: "Hund" }];

  const [categories, setCategories] = useState<Category[]>();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { signedIn, handleSignOut } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    //alert("abmelden.....");
    try {
      await handleSignOut();
      navigate("/");
      setIsMenuOpen(false);
      setActiveSubmenu(null);
    } catch (error) {
      if (error instanceof Error) {
        //toast.error(error.message);
        console.log(error.message);
      } else {
        //toast.error("Error logging out");
        console.log("Error logging out");
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/categories`
        );
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();

    // Menu schließt alle Submenüs bei Klick:
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a")) {
        document
          .querySelectorAll("details[open]")
          .forEach((d) => d.removeAttribute("open"));
      }

      // Close mobile menu when clicking outside
      if (isMenuOpen && !target.closest(".relative")) {
        setIsMenuOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setActiveSubmenu(null);
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  };

  return (
    <>
      <header className="pt-4 pb-2 sticky top-0 border-b z-100 bg-[#1D3349] text-white -translate-y-2 shadow-[0_0_20px_#000] border-[#000]">
        <div className="container m-auto flex align-middle items-center">
          {/* LOGO ############################## */}
          <div className="pl-2 sm:pr-5">
            <NavLink to="/">
              <img
                src="./img/logo-rund-weiss.png"
                title="HOME"
                alt="HOME"
                className="w-16 min-w-16 object-contain"
              />
            </NavLink>
          </div>

          {/* NAVIGATION ######################## */}
          <nav>
            {/* Mobile Dropdown */}
            <div className="relative min-[800px]:hidden">
              <button
                className={`btn btn-ghost btn-square ml-5 ${
                  isMenuOpen ? "bg-[#182a3b]" : ""
                }`}
                onClick={handleMenuToggle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </button>

              {isMenuOpen && (
                <ul className="menu menu-lg absolute left-0 top-full bg-[#1D3349] text-white rounded-box z-[1] mt-3 w-52 shadow-lg border-t-4 border-[#182a3b] overflow-hidden max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
                  {/* Main Menu */}
                  <div
                    className={`transition-transform duration-300 ${
                      activeSubmenu ? "-translate-x-full" : "translate-x-0"
                    }`}
                  >
                    <li>
                      <button
                        onClick={() => setActiveSubmenu("tiersuchen")}
                        className="font-semibold flex justify-between items-center w-full hover:bg-[#182a3b]"
                      >
                        <span>Tier suchen</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveSubmenu("ueberuns")}
                        className="font-semibold flex justify-between items-center w-full hover:bg-[#182a3b]"
                      >
                        <span>Über uns</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </li>
                    <li>
                      <NavLink
                        to="/tier-einstellen"
                        className="font-semibold hover:bg-[#182a3b]"
                        onClick={handleLinkClick}
                      >
                        Tier vermitteln
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/mein-konto"
                        className="font-semibold hover:bg-[#182a3b]"
                        onClick={handleLinkClick}
                      >
                        Meine Kontodaten
                      </NavLink>
                    </li>
                    {signedIn ? (
                      <li>
                        <a
                          onClick={logout}
                          className="font-semibold text-error hover:bg-[#182a3b]"
                        >
                          Abmelden
                        </a>
                      </li>
                    ) : (
                      <>
                        <li>
                          <NavLink
                            to="/login"
                            className="font-semibold hover:bg-[#182a3b]"
                            onClick={handleLinkClick}
                          >
                            Anmelden
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/registrierung"
                            className="font-semibold hover:bg-[#182a3b]"
                            onClick={handleLinkClick}
                          >
                            Registrieren
                          </NavLink>
                        </li>
                      </>
                    )}
                  </div>

                  {/* Tier Suchen Submenu */}

                  <div
                    className={`absolute top-0 left-0 w-full bg-[#1D3349] text-white rounded-box transition-transform duration-300  ${
                      activeSubmenu === "tiersuchen"
                        ? "translate-x-0"
                        : "translate-x-full"
                    }`}
                  >
                    <li>
                      <button
                        onClick={() => setActiveSubmenu(null)}
                        className="font-semibold flex items-center mt-3 hover:bg-[#182a3b]"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        <span>Zurück</span>
                      </button>
                    </li>
                    <div className="divider my-1"></div>
                    <li>
                      <NavLink
                        to="/tier-suchen"
                        className="rounded-md hover:bg-[#182a3b]"
                        onClick={handleLinkClick}
                      >
                        Alle&nbsp;Tiere&nbsp;zeigen
                      </NavLink>
                    </li>
                    {categories?.map((cat) => (
                      <li key={cat._id}>
                        <NavLink
                          to={`/tier-suchen?category=${cat.categoryName.toLocaleLowerCase()}`}
                          className="rounded-md hover:bg-[#182a3b]"
                          onClick={handleLinkClick}
                        >
                          {cat.categoryName}
                        </NavLink>
                      </li>
                    ))}
                  </div>

                  {/* Über Uns Submenu */}
                  <div
                    className={`absolute top-0 left-0 w-full bg-[#1D3349] text-white rounded-box transition-transform duration-300 ${
                      activeSubmenu === "ueberuns"
                        ? "translate-x-0"
                        : "translate-x-full"
                    }`}
                  >
                    <li>
                      <button
                        onClick={() => setActiveSubmenu(null)}
                        className="font-semibold flex items-center mt-3 hover:bg-[#182a3b]"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        <span>Zurück</span>
                      </button>
                    </li>
                    <div className="divider my-1"></div>
                    <li>
                      <NavLink
                        to="/about"
                        className="rounded-md hover:bg-[#182a3b]"
                        onClick={handleLinkClick}
                      >
                        Über uns
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/impressum"
                        className="rounded-md hover:bg-[#182a3b]"
                        onClick={handleLinkClick}
                      >
                        Impressum
                      </NavLink>
                    </li>
                  </div>
                </ul>
              )}
            </div>
            {/* Desktop Navigation */}
            <div className="max-[800px]:hidden flex items-center gap-2">
              <ul className="menu menu-horizontal ">
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
                          <NavLink
                            to={`/tier-suchen?category=${cat.categoryName.toLocaleLowerCase()}`}
                          >
                            {cat.categoryName}
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
                        <NavLink to="/impressum">Impressum</NavLink>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <NavLink to="/tier-einstellen">Tier vermitteln</NavLink>
                </li>

                <li>
                  <NavLink to="/mein-konto">Meine Kontodaten</NavLink>
                </li>
                {signedIn ? (
                  <li>
                    <a onClick={logout}>Abmelden</a>
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink to="/login">Anmelden</NavLink>
                    </li>

                    <li>
                      <NavLink to="/registrierung">Registrieren</NavLink>
                    </li>
                  </>
                )}
                {/* {userData?.roles?.[0] === "admin" && (
                  <li>
                    <NavLink to="/admin-bereich" className="text-[orange]">
                      Admin Bereich
                    </NavLink>
                  </li>
                )} */}
              </ul>
            </div>
          </nav>

          {/* DARK MODE SCHALTER ################ */}
          <div className="flex-1 flex justify-end mr-5">
            <DarkThemeSchalter></DarkThemeSchalter>
          </div>
        </div>
      </header>
    </>
  );
}
