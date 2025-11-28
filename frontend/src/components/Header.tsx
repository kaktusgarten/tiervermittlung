import { useNavigate, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../context";
import DarkThemeSchalter from "./DarkThemeSchalter";
//import LoginModal from "./LoginModal";
export default function Header() {
  // const categories = [{ categoryName: "Hunde", name: "Hund" }];

  const [categories, setCategories] = useState<Category[]>();

  const { signedIn, handleSignOut } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    //alert("abmelden.....");
    try {
      await handleSignOut();
      navigate("/");
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
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <header className="pt-4 pb-2 sticky top-0 bg-[#1D3349] text-white border-b z-100 -translate-y-2 shadow-[0_0_20px_#000] border-[#000]">
        <div className="container m-auto flex align-middle items-center">
          {/* LOGO ############################## */}
          <div className="pl-2 sm:pr-5">
            <NavLink to="/">
              <img
                src="./img/logo-rund-weiss.png"
                title="HOME"
                alt="HOME"
                className="w-16 min-w-16 object-contain "
              />
            </NavLink>
          </div>

          {/* NAVIGATION ######################## */}
          <nav>
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
          </nav>

          {/* DARK MODE SCHALTER ################ */}
          <div className="flex-1 flex justify-end">
            <DarkThemeSchalter></DarkThemeSchalter>
          </div>
        </div>
      </header>
    </>
  );
}
