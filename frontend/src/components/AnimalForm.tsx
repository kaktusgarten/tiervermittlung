import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useNavigate } from "react-router";

// Validierungs-Funktion
function validateRegistration(data: Record<string, string>) {
  const errors: Record<string, string> = {};

  if (!data.name) errors.name = "Der Name des Tieres ist erforderlich";
  if (!data.category) errors.category = "Spezies ist erforderlich";
  if (!data.sex) errors.sex = "Geschlecht ist erforderlich";
  if (!data.description) errors.description = "Beschreibung ist erforderlich";

  return errors;
}

export default function AnimalForm() {
  const navigate = useNavigate();
  // const [userId, setUserId] = useState<string>("");
  const [image, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    // const fetchUser = async () => {
    //   try {
    //     const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/auth/me`, {
    //       credentials: "include",
    //     });
    //     if (!res.ok) throw new Error("User-Daten konnten nicht geladen werden");
    //     const data = await res.json();
    //     setUserId(data.user._id);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

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
    // fetchUser();
  }, []);

  async function submitAction(_prevState: any, formData: FormData) {
    // Bilder ins FormData einfügen
    image.forEach((img) => formData.append("image", img));

    // Alter als Zahl setzen (String → Number)
    const ageStr = formData.get("animalAge") as string | null;
    if (ageStr) {
      formData.set("animalAge", Number(ageStr).toString());
    }

    const dataObj = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const validationErrors = validateRegistration(dataObj);
    if (Object.keys(validationErrors).length > 0) {
      return { errors: validationErrors, input: dataObj };
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/animals`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Anmeldung des Tieres fehlgeschlagen");

      const result = await res.json();
      console.log("Tier-Registrierung erfolgreich:", result);

      navigate("/");
      return {};
    } catch (error) {
      console.error(error);
      return {
        errors: {
          button:
            "Tier-Registrierung fehlgeschlagen. Bitte überprüfe deine Eingaben.",
        },
        input: dataObj,
      };
    }
  }

  const [formState, formAction, isPending] = useActionState(submitAction, {});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  return (
    <form action={formAction} encType="multipart/form-data">
      <fieldset className="fieldset bg-base-100 border-base rounded-box border p-4">
        <legend className="fieldset-legend">
          Registrierungsdaten eingeben:
        </legend>

        {/* Tier Name */}
        <label className="label">Tiername</label>
        <input
          defaultValue={formState.input?.name}
          name="name"
          className="input w-full"
          placeholder="Name deines Tieres"
          disabled={isPending}
        />
        {formState.errors?.name && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.name}</p>
        )}

        {/* Kategorie / Spezies */}
        <label className="label mt-2">Spezies</label>
        <select
          defaultValue={formState.input?.category || ""}
          name="category"
          className="select w-full"
          disabled={isPending}
        >
          <option value="">-- bitte auswählen --</option>
          {categories?.map((cat) => (
            <option key={cat._id} value={cat.categoryName}>
              {cat.categoryName}
            </option>
          ))}
        </select>
        {formState.errors?.category && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.category}
          </p>
        )}

        {/* Rasse */}
        <label className="label mt-2">Rasse</label>
        <input
          defaultValue={formState.input?.animalRasse}
          name="race"
          className="input w-full"
          placeholder="Rasse"
          disabled={isPending}
        />
        {formState.errors?.animalRasse && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.animalRasse}
          </p>
        )}

        {/* Alter */}
        <label className="label mt-2">Alter</label>
        <input
          type="number"
          defaultValue={formState.input?.animalAge}
          name="age"
          className="input w-full"
          placeholder="Alter"
          disabled={isPending}
        />
        {formState.errors?.animalAge && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.animalAge}
          </p>
        )}

        {/* Geschlecht */}
        <label className="label mt-2">Geschlecht</label>
        <select
          defaultValue={formState.input?.sex || ""}
          name="sex"
          className="select w-full"
          disabled={isPending}
        >
          <option value="">-- bitte auswählen --</option>
          <option value="männlich">Männlich</option>
          <option value="weiblich">Weiblich</option>
          <option value="unbekannt">Unbekannt</option>
        </select>
        {formState.errors?.sex && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.sex}</p>
        )}

        {/* Beschreibung */}
        <label className="label mt-2">Beschreibung</label>
        <textarea
          defaultValue={formState.input?.description}
          name="description"
          className="textarea w-full"
          placeholder="Beschreibung des Tieres"
          disabled={isPending}
        />
        {formState.errors?.description && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.description}
          </p>
        )}

        {/* Characteristics */}
        <label className="label mt-2">Eigenschaften</label>
        <input
          defaultValue={formState.input?.characteristics}
          name="characteristics"
          className="input w-full"
          placeholder="Eigenschaften"
          disabled={isPending}
        />

        {/* Handicap */}
        <label className="label mt-2">Handicap</label>
        <select
          defaultValue={formState.input?.handycap || ""}
          name="handycap"
          className="select w-full"
          disabled={isPending}
        >
          <option value="">-- bitte auswählen --</option>
          <option value="true">Ja</option>
          <option value="false">Nein</option>
        </select>
        {formState.errors?.handycap && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.handycap}
          </p>
        )}

        {/* Bilder Upload */}
        <fieldset className="fieldset mt-4">
          <legend className="fieldset-legend">Bilder hochladen</legend>
          <input
            type="file"
            name="image"
            className="file-input"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={isPending}
          />
          {image.length > 0 && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {image.map((img, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          )}
        </fieldset>

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
