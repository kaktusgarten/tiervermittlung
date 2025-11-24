import { useActionState } from "react";
import { Link, useNavigate } from "react-router";

//  Validierungs-Funktion
function validateRegistration(data: Record<string, string>) {
  const errors: Record<string, string> = {};

  if (!data.animalName)
    errors.animalName = "Der Name des Tieres ist erforderlich";
  if (!data.animalSpezies)
    errors.animalSpezies = "Tierspezies ist erforderlich";
  // UND SO WEITER......

  return errors;
}

export default function AnimalForm() {
  const navigate = useNavigate();

  async function submitAction(_prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const validationErrors = validateRegistration(data);
    if (Object.keys(validationErrors).length > 0) {
      return { errors: validationErrors, input: data };
    }

    try {
      console.log("Registriere Benutzer:", data);

      // POST-Request an Backend ###############################################################
      const { password2, ...sendData } = data; // password2 nicht speichern
      const res = await fetch("http://localhost:3000/animal/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });

      console.log("Animal-Registrierungs-Response ist: ");
      console.log(res);
      if (!res.ok) throw new Error("Anmeldung des Tieres fehlgeschlagen");

      const result = await res.json();
      console.log("Tier-Registrierung erfolgreich:", result);

      // NACH LOGIN WEITERLEITEN ##############################
      navigate("/");
      return {};
    } catch (error) {
      console.error(error);
      return {
        errors: {
          button:
            "Tier-Registrierung fehlgeschlagen. Bitte überprüfe deine Eingaben.",
        },
        input: data,
      };
    }
  }

  const [formState, formAction, isPending] = useActionState(submitAction, {});

  return (
    <form action={formAction}>
      <fieldset className="fieldset bg-base-100 border-base rounded-box border p-4">
        <legend className="fieldset-legend">
          Registrierungsdaten eingeben:
        </legend>

        {/* Tier Name */}
        <label className="label">Tiername</label>
        <input
          defaultValue={formState.input?.animalName}
          name="animalName"
          className="input w-full"
          placeholder="Name deines Tieres"
          disabled={isPending}
        />
        {formState.errors?.animalName && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.animalName}
          </p>
        )}

        {/* Speziel */}
        <label className="label mt-2">Spezies</label>
        <input
          defaultValue={formState.input?.animalSpezies}
          name="animalSpezies"
          className="input w-full"
          placeholder="Tier Spezies (Hund, Katze, Maus)"
          disabled={isPending}
        />
        {formState.errors?.spezies && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.animalSpezies}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary mt-4 w-full"
          disabled={isPending}
        >
          {isPending ? "Tier registrieren..." : "Tier registrieren"}
        </button>
        {formState.errors?.button && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.button}</p>
        )}
      </fieldset>
    </form>
  );
}
