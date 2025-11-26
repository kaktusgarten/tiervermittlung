import { Outlet, useNavigate } from "react-router";
// import { useEffect, use } from "react";
import { useEffect } from "react";
// import { GesamtseitenContext } from "../context/GesamtseitenContext";
import { useAuth } from "../context";

export default function ProtectedLayout() {
  const navigate = useNavigate();
  // Hier die Lösung der ganzen Schei..e: Das Ausrufezeichen "!" am Ende...
  // const { myToken } = use(GesamtseitenContext)!;
  // const token = myToken;
  const { signedIn } = useAuth();
  useEffect(() => {
    //if (!token) {
    if (!signedIn) {
      console.log("Erst anmelden! Dieser Bereich ist geschützt.");
      navigate("/login");
    }
    // }, [token, navigate]);
  }, [signedIn, navigate]);
  if (!signedIn) return null;
  //if (!token) return null;

  return <Outlet />;
}
