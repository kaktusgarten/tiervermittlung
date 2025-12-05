import { useActionState, useState, useEffect } from "react";
import { useNavigate } from "react-router";

interface User {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  street?: string;
  streetNumber?: string;
  postalCode?: string;
  city?: string;
  phone?: string;
}

// Validierungsfunktion
function validateRegistration(data: Record<string, string>) {
  const errors: Record<string, string> = {};

  if (!data.firstName) errors.firstName = "Vorname ist erforderlich.";
  if (!data.lastName) errors.lastName = "Nachname ist erforderlich.";
  if (!data.email) errors.email = "E-Mail ist erforderlich.";

  if (!data.street) errors.street = "Straße ist erforderlich.";
  if (!data.streetNumber) errors.streetNumber = "Hausnummer ist erforderlich.";
  if (!data.postalCode) errors.postalCode = "PLZ ist erforderlich.";
  if (!data.city) errors.city = "Stadt ist erforderlich.";

  if (data.phone && !/^[0-9+\s()-]{6,}$/.test(data.phone)) {
    errors.phone = "Bitte gib eine gültige Telefonnummer ein.";
  }

  return errors;
}

export default function FormChangeUserData() {
  const [userData, setUserData] = useState<User>({});
  const [formValues, setFormValues] = useState<User>({});
  const [disabled, setDisabled] = useState(true);

  // Daten vom Server laden
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/auth/me`
        );
        const data = await res.json();
        setUserData(data.user);
        setFormValues(data.user); // Form direkt füllen
      } catch (error) {
        console.log(error);
      }
    };

    fetchMe();
  }, []);

  function enableInputForm() {
    setDisabled(!disabled);
  }

  // Submit Action
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
      const res = await fetch(`${process.env}/users/${userData?._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Update fehlgeschlagen");

      const updatedUser = await res.json();

      setUserData(updatedUser);
      setFormValues(updatedUser); // Formwerte aktualisieren
      setDisabled(true);

      return {};
    } catch (error) {
      console.error(error);
      return {
        errors: {
          button: "Update fehlgeschlagen. Bitte überprüfe deine Eingaben.",
        },
        input: data,
      };
    }
  }

  const [formState, formAction, isPending] = useActionState(submitAction, {});

  return (
    <form action={formAction} className="userDataForm">
      <fieldset className="fieldset bg-base-300 rounded-box border p-4">
        <legend className="fieldset-legend">Deine Kontodaten</legend>

        <button
          type="button"
          className="btn btn-primary mb-4"
          onClick={enableInputForm}
        >
          {disabled ? "Bearbeiten" : "Eingabe sperren"}
        </button>

        {/* Vorname */}
        <label className="label mt-2">Vorname</label>
        <input
          value={formValues.firstName ?? ""}
          name="firstName"
          className="input w-full"
          disabled={disabled || isPending}
          style={{
            border: disabled || isPending ? "1px solid gray" : "1px solid blue",
          }}
          onChange={(e) =>
            setFormValues({ ...formValues, firstName: e.target.value })
          }
        />
        {formState.errors?.firstName && (
          <p className="text-sm text-red-400">{formState.errors.firstName}</p>
        )}

        {/* Nachname */}
        <label className="label mt-2">Nachname</label>
        <input
          value={formValues.lastName ?? ""}
          name="lastName"
          className="input w-full"
          disabled={disabled || isPending}
          style={{
            border: disabled || isPending ? "1px solid gray" : "1px solid blue",
          }}
          onChange={(e) =>
            setFormValues({ ...formValues, lastName: e.target.value })
          }
        />
        {formState.errors?.lastName && (
          <p className="text-sm text-red-400">{formState.errors.lastName}</p>
        )}

        {/* E-Mail */}
        <label className="label mt-2">E-Mail</label>
        <input
          value={formValues.email ?? ""}
          name="email"
          type="email"
          className="input w-full"
          style={{
            border: disabled || isPending ? "1px solid gray" : "1px solid blue",
          }}
          disabled={disabled || isPending}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
        />
        {formState.errors?.email && (
          <p className="text-sm text-red-400">{formState.errors.email}</p>
        )}

        {/* Straße */}
        <label className="label mt-2">Straße</label>
        <input
          value={formValues.street ?? ""}
          name="street"
          className="input w-full"
          style={{
            border: disabled || isPending ? "1px solid gray" : "1px solid blue",
          }}
          disabled={disabled || isPending}
          onChange={(e) =>
            setFormValues({ ...formValues, street: e.target.value })
          }
        />
        {formState.errors?.street && (
          <p className="text-sm text-red-400">{formState.errors.street}</p>
        )}

        {/* Hausnummer */}
        <label className="label mt-2">Hausnummer</label>
        <input
          value={formValues.streetNumber ?? ""}
          name="streetNumber"
          className="input w-full"
          style={{
            border: disabled || isPending ? "1px solid gray" : "1px solid blue",
          }}
          disabled={disabled || isPending}
          onChange={(e) =>
            setFormValues({ ...formValues, streetNumber: e.target.value })
          }
        />
        {formState.errors?.streetNumber && (
          <p className="text-sm text-red-400">
            {formState.errors.streetNumber}
          </p>
        )}

        {/* PLZ */}
        <label className="label mt-2">PLZ</label>
        <input
          value={formValues.postalCode ?? ""}
          name="postalCode"
          className="input w-full"
          style={{
            border: disabled || isPending ? "1px solid gray" : "1px solid blue",
          }}
          disabled={disabled || isPending}
          onChange={(e) =>
            setFormValues({ ...formValues, postalCode: e.target.value })
          }
        />
        {formState.errors?.postalCode && (
          <p className="text-sm text-red-400">{formState.errors.postalCode}</p>
        )}

        {/* Stadt */}
        <label className="label mt-2">Stadt</label>
        <input
          value={formValues.city ?? ""}
          name="city"
          className="input w-full"
          style={{
            border: disabled || isPending ? "1px solid gray" : "1px solid blue",
          }}
          disabled={disabled || isPending}
          onChange={(e) =>
            setFormValues({ ...formValues, city: e.target.value })
          }
        />
        {formState.errors?.city && (
          <p className="text-sm text-red-400">{formState.errors.city}</p>
        )}

        {/* Telefonnummer */}
        <label className="label mt-2">Telefonnummer</label>
        <input
          value={formValues.phone ?? ""}
          name="phone"
          className="input w-full"
          style={{
            border: disabled || isPending ? "1px solid gray" : "1px solid blue",
          }}
          disabled={disabled || isPending}
          onChange={(e) =>
            setFormValues({ ...formValues, phone: e.target.value })
          }
        />
        {formState.errors?.phone && (
          <p className="text-sm text-red-400">{formState.errors.phone}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary mt-4 w-full"
          disabled={disabled || isPending}
        >
          {isPending ? "wird gespeichert..." : "Speichern"}
        </button>

        {formState.errors?.button && (
          <p className="text-sm text-red-400 mt-2">{formState.errors.button}</p>
        )}
      </fieldset>
    </form>
  );
}
