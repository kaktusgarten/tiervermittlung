import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useNavigate } from "react-router";

// Validierungs-Funktion
function validateEdit(data: Record<string, string>) {
  const errors: Record<string, string> = {};

  if (!data.name) errors.name = "Der Name des Tieres ist erforderlich";
  if (!data.category) errors.category = "Spezies ist erforderlich";
  if (!data.sex) errors.sex = "Geschlecht ist erforderlich";
  if (!data.description) errors.description = "Beschreibung ist erforderlich";
  if (!data.age) errors.age = "Ungefähres Alter des Tieres angeben";
  if (!data.race) errors.race = "Welche Tierrasse?";
  if (!data.characteristics)
    errors.characteristics = "Eigenschaften des Tieres?";
  if (!data.handycap) errors.handycap = "Hat das Tier eine Behinderung?";

  return errors;
}

export default function AnimalEditForm({ animal }) {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [characteristics, setCharacteristics] = useState<string[]>([]);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<
    string[]
  >([]);

  // ⭐ Controlled Form State
  const [formData, setFormData] = useState({
    name: animal.name || "",
    category: animal.category || "",
    race: animal.race || "",
    age: animal.age || "",
    sex: animal.sex || "",
    description: animal.description || "",
    characteristics: animal.characteristics || [],
    handycap: animal.handycap || "",
  });

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setSelectedCharacteristics(
      (prev) =>
        checked
          ? [...prev, value] // hinzufügen
          : prev.filter((v) => v !== value) // entfernen
    );
  };

  // Kategorien laden
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/categories`
        );
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }
    async function loadCharacteristics() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/characteristics`
        );
        const dataChar = await res.json();
        setCharacteristics(dataChar);
        console.log(dataChar);
      } catch (error) {
        console.error(error);
      }
    }
    setSelectedCharacteristics(animal.characteristics || []);
    loadCategories();
    loadCharacteristics();
  }, []);

  // FormAction Handler
  async function submitAction(_prevState: any, formDataSubmit: FormData) {
    // Bilder hinzufügen
    images.forEach((img) => formDataSubmit.append("image", img));

    // Alter in Zahl umwandeln
    const ageStr = formDataSubmit.get("age") as string | null;
    if (ageStr) {
      formDataSubmit.set("age", Number(ageStr).toString());
    }

    //  NEU: Characteristics als reines String-Array senden
    formDataSubmit.delete("characteristics");
    selectedCharacteristics.forEach((c) =>
      formDataSubmit.append("characteristics", c)
    );

    // FormData in Objekt für Validierung umwandeln
    const dataObj = Object.fromEntries(formDataSubmit.entries()) as Record<
      string,
      string
    >;

    const validationErrors = validateEdit(dataObj);
    if (Object.keys(validationErrors).length > 0) {
      return { errors: validationErrors, input: dataObj };
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/animals/${animal._id}`,
        {
          method: "PUT",
          body: formDataSubmit,
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Tier-Bearbeitung fehlgeschlagen");

      await res.json();
      navigate("/mein-konto");
      return {};
    } catch (error) {
      console.error(error);
      return {
        errors: {
          button:
            "Tier-Bearbeitung fehlgeschlagen. Bitte überprüfe deine Eingaben.",
        },
        input: dataObj,
      };
    }
  }

  const [formState, formAction, isPending] = useActionState(submitAction, {});

  // ⭐ Wenn Fehler → FormData aktualisieren
  useEffect(() => {
    if (formState.input) {
      setFormData((prev) => ({ ...prev, ...formState.input }));
    }
  }, [formState.input]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };
  //encType="multipart/form-data"
  return (
    <form action={formAction} className="userDataForm">
      <fieldset className="fieldset bg-base-300 border-base rounded-box border p-4">
        <legend className="fieldset-legend">Neue Tierdaten eingeben:</legend>

        {/* Name */}
        <label className="label">Tiername</label>
        <input
          name="name"
          className="input w-full"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={isPending}
        />
        {formState.errors?.name && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.name}</p>
        )}

        {/* Kategorie */}
        <label className="label mt-2">Spezies</label>
        <select
          name="category"
          className="select w-full"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          disabled={isPending}
        >
          <option value="">-- bitte auswählen --</option>
          {categories.map((cat) => (
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
          name="race"
          className="input w-full"
          value={formData.race}
          onChange={(e) => setFormData({ ...formData, race: e.target.value })}
          disabled={isPending}
        />
        {formState.errors?.race && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.race}</p>
        )}

        {/* Alter */}
        <label className="label mt-2">Alter</label>
        <input
          type="number"
          name="age"
          className="input w-full"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          disabled={isPending}
        />
        {formState.errors?.age && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.age}</p>
        )}

        {/* Geschlecht */}
        <label className="label mt-2">Geschlecht</label>
        <select
          name="sex"
          className="select w-full"
          value={formData.sex}
          onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
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
          name="description"
          className="textarea w-full"
          value={formData.description}
          rows={10}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          disabled={isPending}
        />
        {formState.errors?.description && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.description}
          </p>
        )}

        {/* Characteristics */}
        <p className="label mt-2">Eigenschaften</p>
        <div className="py-3">
          {characteristics.map((char) => (
            <div key={char._id} className="mb-2">
              <label className="flex items-center gap-3">
                <input
                  className="checkbox"
                  type="checkbox"
                  value={char.characteristic}
                  checked={selectedCharacteristics.includes(
                    char.characteristic
                  )}
                  onChange={handleCheck}
                  disabled={isPending}
                />
                {char.characteristic}
              </label>
            </div>
          ))}
        </div>

        {/* Handicap */}
        <label className="label mt-2">Handicap</label>
        <select
          name="handycap"
          className="select w-full"
          value={formData.handycap}
          onChange={(e) =>
            setFormData({ ...formData, handycap: e.target.value })
          }
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

        {/* Bilder */}
        <fieldset className="fieldset mt-4">
          <legend className="fieldset-legend">Bilder hochladen</legend>

          <input
            type="file"
            name="image"
            className="file-input w-full"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={isPending}
          />

          {images.length > 0 && (
            <div className="mt-3 flex gap-2 flex-wrap w-full">
              {images.map((img, idx) => (
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

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={isPending}
        >
          {isPending ? "Tier bearbeiten..." : "Absenden"}
        </button>

        {formState.errors?.button && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.button}</p>
        )}
      </fieldset>
    </form>
  );
}
