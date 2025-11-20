import { Outlet, useNavigate } from "react-router";
import { useEffect, use } from "react";
import { GesamtseitenContext } from "../context/GesamtseitenContext";

export default function ProtectedLayout() {
  const navigate = useNavigate();
  // Hier die Lösung der ganzen Schei..e: Das Ausrufezeichen "!" am Ende...
  const { myToken } = use(GesamtseitenContext)!;
  const token = myToken;

  useEffect(() => {
    if (!token) {
      console.log(
        "Erst anmelden! Dieser Bereich ist geschützt. Siehe 'ProdectedLayout.tsx' Datei"
      );
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  return <Outlet />;
}
