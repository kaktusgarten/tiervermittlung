import { Link, useNavigate } from "react-router";
import { useActionState, use } from "react";
import { GesamtseitenContext } from "../context/GesamtseitenContext";

export default function LoginForm() {
  const navigate = useNavigate();

  const { setMyToken } = use(GesamtseitenContext);

  //
  //
  // FORM ACTION **********************************************
  async function submitAction(_prevState: any, formData: FormData) {
    // Klasisch eigentlich so:
    // const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    // Validierung
    if (1 === 1) {
      // WENN ALLES OK, ABSENDEN...
      console.log("ABSENDEN");
      console.log("FormData:", data);
      // Check ob pending funktioniert, 1Sekunde warten:
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      setMyToken("MeinTollerToken");
      console.log("Token gesetzt");

      // Close Modal!
      (
        document.getElementById("loginModal") as HTMLDialogElement | null
      )?.close();

      // Alles gut, Tschüss..
      navigate("/");
      // Kein Rückgabewert ans Formular
      return {};
    } else {
      // Fehler, kein Absenden:
      alert("FEHLER");
      // Formdaten zurück ans Formular:
      return {
        input: data,
      };
    }
  }

  // ENDE- ****************************************************

  // useActionState() HOOK
  const [formState, formAction, isPending] = useActionState(submitAction, {});

  return (
    <>
      <form action={formAction}>
        <fieldset className="fieldset bg-base-100 border-base rounded-box border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Email</label>
          <input
            defaultValue={formState.input?.email}
            name="email"
            type="email"
            placeholder="E-Mail"
            className="input w-[100%]"
            disabled={isPending}
          />

          <label className="label">Passwort</label>
          <input
            defaultValue={formState.input?.password}
            name="password"
            type="password"
            className="input  w-[100%]"
            placeholder="Passwort"
            disabled={isPending}
          />

          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={isPending}
          >
            Anmelden
          </button>

          <p className="m-3">
            <Link to="/registrierung">
              Du hast noch kein Konto?{" "}
              <span className="underline">Hier Registrieren!</span>
            </Link>
          </p>
        </fieldset>
      </form>
    </>
  );
}
