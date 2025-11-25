import { NavLink } from "react-router";
import LoginModal from "./LoginModal";
export default function Header() {
  return (
    <>
      <header className="p-4">
        <nav className="">
          <ul className="flex gap-5 text-base text-white">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/tier-suchen">Tierfinder</NavLink>
            </li>
            <li>
              <NavLink to="/tier-einstellen">Tier-einstellen</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/login">Anmelden</NavLink>
            </li>
            <li>
              <NavLink to="/registrierung">Registrierung</NavLink>
            </li>
            <li>
              <NavLink to="/mein-konto">Mein Konto</NavLink>
            </li>
            <li>
              <NavLink to="/admin-bereich">Admin Bereich</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
