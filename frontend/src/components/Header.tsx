import { NavLink } from "react-router";
import LoginModal from "./LoginModal";
export default function Header() {
  return (
    <>
      <header className="p-4">
        <nav className="pt-5">
          <ul className="flex gap-5 text-white">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <LoginModal />
            </li>
            <li>
              <NavLink to="/registrierung">Registrierung</NavLink>
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
