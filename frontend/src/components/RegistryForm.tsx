import { useActionState } from "react";
import { Link, useNavigate } from "react-router";

//  Validierungs-Funktion
function validateRegistration(data: Record<string, string>) {
  const errors: Record<string, string> = {};

  if (!data.firstName) errors.firstName = "Vorname ist erforderlich.";
  if (!data.lastName) errors.lastName = "Nachname ist erforderlich.";

  if (!data.email) {
    errors.email = "E-Mail ist erforderlich.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
  }
  if (!data.street) errors.street = "Straße ist erforderlich.";
  if (!data.streetNumber) errors.streetNumber = "Hausnummer ist erforderlich.";
  if (!data.postalCode) errors.postalCode = "PLZ ist erforderlich.";
  else if (!/^\d{4,5}$/.test(data.postalCode))
    errors.postalCode = "PLZ muss 4–5 Ziffern enthalten.";
  if (!data.city) errors.city = "Stadt ist erforderlich.";
  if (data.phone && !/^[0-9+\s()-]{6,}$/.test(data.phone)) {
    errors.phone = "Bitte gib eine gültige Telefonnummer ein.";
  }
  if (!data.password) {
    errors.password = "Passwort ist erforderlich.";
  } else if (data.password.length < 6) {
    errors.password = "Passwort muss mindestens 6 Zeichen lang sein.";
  }
  if (!data.password2) {
    errors.password2 = "Bitte wiederhole dein Passwort.";
  } else if (data.password !== data.password2) {
    errors.password2 = "Die Passwörter stimmen nicht überein.";
  }
  return errors;
}

export default function RegistryForm() {
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
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });

      console.log("Registrierungs-Response ist: ");
      console.log(res);
      if (!res.ok) throw new Error("Registrierung fehlgeschlagen");

      const result = await res.json();
      console.log("Registrierung erfolgreich:", result);

      // NACH LOGIN WEITERLEITEN ##############################
      navigate("/");
      return {};
    } catch (error) {
      console.error(error);
      return {
        errors: {
          button:
            "Registrierung fehlgeschlagen. Bitte überprüfe deine Eingaben.",
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

        {/* Vorname */}
        <label className="label">Vorname</label>
        <input
          defaultValue={formState.input?.firstName}
          name="firstName"
          className="input w-full"
          placeholder="Vorname"
          disabled={isPending}
        />
        {formState.errors?.firstName && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.firstName}
          </p>
        )}

        {/* Nachname */}
        <label className="label mt-2">Nachname</label>
        <input
          defaultValue={formState.input?.lastName}
          name="lastName"
          className="input w-full"
          placeholder="Nachname"
          disabled={isPending}
        />
        {formState.errors?.lastName && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.lastName}
          </p>
        )}

        {/* E-Mail */}
        <label className="label mt-2">E-Mail</label>
        <input
          defaultValue={formState.input?.email}
          name="email"
          type="email"
          className="input w-full"
          placeholder="E-Mail-Adresse"
          disabled={isPending}
          autoComplete="email"
        />
        {formState.errors?.email && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.email}</p>
        )}

        {/* Street */}
        <label className="label mt-2">Straße</label>
        <input
          defaultValue={formState.input?.street}
          name="street"
          className="input w-full"
          placeholder="Straße"
          disabled={isPending}
        />
        {formState.errors?.street && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.street}</p>
        )}

        {/* streetNumber */}
        <label className="label mt-2">Hausnummer</label>
        <input
          defaultValue={formState.input?.streetNumber}
          name="streetNumber"
          className="input w-full"
          placeholder="Hausnummer"
          disabled={isPending}
        />
        {formState.errors?.streetNumber && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.streetNumber}
          </p>
        )}

        {/* PLZ */}
        <label className="label mt-2">PLZ</label>
        <input
          defaultValue={formState.input?.postalCode}
          name="postalCode"
          className="input w-full"
          placeholder="PLZ"
          disabled={isPending}
        />
        {formState.errors?.postalCode && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.postalCode}
          </p>
        )}

        {/* CITY */}
        <label className="label mt-2">Stadt</label>
        <input
          defaultValue={formState.input?.city}
          name="city"
          className="input w-full"
          placeholder="Stadt"
          disabled={isPending}
        />
        {formState.errors?.city && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.city}</p>
        )}

        {/* Telefonnummer */}
        <label className="label mt-2">Telefonnummer (optional)</label>
        <input
          defaultValue={formState.input?.phone}
          name="phone"
          className="input w-full"
          placeholder="Telefonnummer"
          disabled={isPending}
        />
        {formState.errors?.phone && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.phone}</p>
        )}

        {/* Passwort */}
        <label className="label mt-2">Passwort</label>
        <input
          defaultValue={formState.input?.password}
          name="password"
          type="password"
          className="input w-full"
          placeholder="Passwort"
          disabled={isPending}
          autoComplete="new-password"
        />
        {formState.errors?.password && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.password}
          </p>
        )}

        <label className="label mt-2">Passwort wiederholen</label>
        <input
          defaultValue={formState.input?.password2}
          name="password2"
          type="password"
          className="input w-full"
          placeholder="Passwort wiederholen"
          disabled={isPending}
          autoComplete="new-password"
        />
        {formState.errors?.password2 && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.password2}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary mt-4 w-full"
          disabled={isPending}
        >
          {isPending ? "Registrieren..." : "Registrieren"}
        </button>
        {formState.errors?.button && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.button}</p>
        )}

        <p className="mt-4 text-center">
          <Link to="/login">
            Bereits ein Konto? <span className="underline">Hier anmelden!</span>
          </Link>
        </p>
      </fieldset>
    </form>
  );
}
