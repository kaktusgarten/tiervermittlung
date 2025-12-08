import { useNavigate, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../context";
import DarkThemeSchalter from "./DarkThemeSchalter";

export default function Header() {
  const [categories, setCategories] = useState<Category[]>();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { signedIn, handleSignOut } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await handleSignOut();
      navigate("/");
      setIsMenuOpen(false);
      setActiveSubmenu(null);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Error logging out");
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

    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.closest("a")) {
        document
          .querySelectorAll("details[open]")
          .forEach((d) => d.removeAttribute("open"));
      }

      // Mobile Menü automatisch ausblenden, wenn außerhalb geklickt
      if (isMenuOpen && !target.closest(".mobile-menu-area")) {
        setIsMenuOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setActiveSubmenu(null);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  };

  return (
    <>
      <header className="pt-2 pb-2 sticky top-0 border-b z-10000 bg-[#1D3349] text-white shadow-[0_0_20px_#000] border-[#000]">
        <div className="container m-auto flex items-center justify-between">
          {/* MOBILE NAVIGATION */}
          <div className="relative min-[768px]:hidden mobile-menu-area">
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
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>

            {isMenuOpen && (
              <ul
                className="menu menu-lg absolute left-0 top-full  text-white z-[1] mt-5 w-[80vw]
              border-t-4 border-[#182a3b] min-h-[68vh] overflow-y-auto overflow-hidden scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent"
                style={{ backgroundColor: "rgba(29, 51, 73, 0.98)" }}
              >
                {/* MAIN MOBILE MENU */}
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
                      <ChevronRight />
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => setActiveSubmenu("ueberuns")}
                      className="font-semibold flex justify-between items-center w-full hover:bg-[#182a3b]"
                    >
                      <span>Über uns</span>
                      <ChevronRight />
                    </button>
                  </li>

                  <li>
                    <NavLink
                      to="/tier-einstellen"
                      onClick={handleLinkClick}
                      className="font-semibold hover:bg-[#182a3b]"
                    >
                      Tier vermitteln
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/mein-konto"
                      onClick={handleLinkClick}
                      className="font-semibold hover:bg-[#182a3b]"
                    >
                      Meine Konto
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
                          onClick={handleLinkClick}
                          className="font-semibold hover:bg-[#182a3b]"
                        >
                          Anmelden
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/registrierung"
                          onClick={handleLinkClick}
                          className="font-semibold hover:bg-[#182a3b]"
                        >
                          Registrieren
                        </NavLink>
                      </li>
                    </>
                  )}
                </div>

                {/* SUBMENU: TIER SUCHEN */}
                <div
                  className={`absolute top-0 left-0 w-full bg-[#1D3349] text-white transition-transform duration-300 ${
                    activeSubmenu === "tiersuchen"
                      ? "translate-x-0"
                      : "translate-x-full"
                  }`}
                >
                  <BackButton onClick={() => setActiveSubmenu(null)} />

                  <li>
                    <NavLink
                      to="/tier-suchen"
                      onClick={handleLinkClick}
                      className="hover:bg-[#182a3b]"
                    >
                      Alle&nbsp;Tiere&nbsp;zeigen
                    </NavLink>
                  </li>

                  {categories?.map((cat) => (
                    <li key={cat._id}>
                      <NavLink
                        to={`/tier-suchen?category=${cat.categoryName.toLowerCase()}`}
                        onClick={handleLinkClick}
                        className="hover:bg-[#182a3b]"
                      >
                        {cat.categoryName}
                      </NavLink>
                    </li>
                  ))}
                </div>

                {/* SUBMENU: ÜBER UNS */}
                <div
                  className={`absolute top-0 left-0 w-full bg-[#1D3349] text-white transition-transform duration-300 ${
                    activeSubmenu === "ueberuns"
                      ? "translate-x-0"
                      : "translate-x-full"
                  }`}
                >
                  <BackButton onClick={() => setActiveSubmenu(null)} />

                  <li>
                    <NavLink
                      to="/about"
                      onClick={handleLinkClick}
                      className="hover:bg-[#182a3b]"
                    >
                      Über uns
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/impressum"
                      onClick={handleLinkClick}
                      className="hover:bg-[#182a3b]"
                    >
                      Impressum
                    </NavLink>
                  </li>
                </div>
              </ul>
            )}
          </div>

          {/* LOGO */}
          <div className="pl-2 sm:pr-5">
            <NavLink to="/">
              <img
                src="../img/logo-rund-weiss.png"
                alt="HOME"
                title="HOME"
                className="w-16 min-w-16 object-contain"
              />
            </NavLink>
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden min-[768px]:flex items-center gap-4 hyphens-none">
            <ul className="menu menu-horizontal font-semibold">
              <li>
                <details>
                  <summary>Tier suchen</summary>
                  <ul className="bg-white text-black border border-[#1D3349] -translate-y-1 shadow-lg">
                    <li>
                      <NavLink to="/tier-suchen">
                        Alle&nbsp;Tiere&nbsp;zeigen
                      </NavLink>
                    </li>
                    {categories?.map((cat) => (
                      <li key={cat._id}>
                        <NavLink
                          to={`/tier-suchen?category=${cat.categoryName.toLowerCase()}`}
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
                  <ul className="bg-white text-black border border-[#1D3349] -translate-y-1 shadow-lg">
                    <li>
                      <NavLink to="/about">Über&nbsp;uns</NavLink>
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
                <NavLink to="/mein-konto">Meine Konto</NavLink>
              </li>

              {signedIn ? (
                <li>
                  <a onClick={() => logout()}>Abmelden</a>
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
            </ul>
          </div>

          {/* DARK MODE SWITCH */}
          <div className="md:flex-1 flex justify-end mr-5">
            <DarkThemeSchalter />
          </div>
        </div>
      </header>
    </>
  );
}

/* --- Kleine Hilfs-Komponenten für Icons / Back Button --- */

function ChevronRight() {
  return (
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
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <>
      <li>
        <button
          onClick={onClick}
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
      <div className="divider my-1" />
    </>
  );
}
