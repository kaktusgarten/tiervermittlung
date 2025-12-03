import { useActionState, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";

import MainImage from "../components/MainImage";
import CardAnimal from "../components/CardAnimal";
import AnimalsLocationMap from "../components/AnimalsLocationMap";

export default function SearchAnimalPage() {
  const [animals, setAnimals] = useState<Animal[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [characteristics, setCharacteristics] = useState<Characteristic[]>();
  const [value, setValue] = useState("");
  const [searchString, setSearchString] = useState("");
  //  const [state, formAction] = useActionState(action, null);

  const { slug } = useParams<{ slug?: string }>();
  const [searchParms, setSearchParms] = useSearchParams();

  let navigate = useNavigate();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParms);

    if (!value || value.startsWith("--")) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParms(params);
  };

  const toggleCharacteristic = (id: string) => {
    const params = new URLSearchParams(searchParms);

    const char = characteristics?.find((c) => c._id === id);
    if (!char) return;

    const name = char.characteristic;
    const list = params.getAll("characteristics");

    if (list.includes(name)) {
      // löschen
      const newList = list.filter((x) => x !== name);
      params.delete("characteristics");
      newList.forEach((x) => params.append("characteristics", x));
    } else {
      // hinzufügen
      params.append("characteristics", name);
    }

    setSearchParms(params);
  };

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        // const fullSearch = !searchString
        //   ? `?category=${searchParms.get("category")}`
        //   : searchString;

        const hasSearchParams = [...searchParms.keys()].length > 0;

        const fullSearch = !searchString
          ? hasSearchParams
            ? `?${searchParms.toString()}`
            : "" // <--- Wichtig: keine Query → alle Tiere laden
          : searchString;

        const res = await fetch(
          //     `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/animals${searchString}`
          `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/animals${fullSearch}`,
          { credentials: "include" }
        );

        const data = await res.json();
        setAnimals(data);

        // Letzte Auswahl zurücksetzen
        if (!searchString) {
          setSearchString("");
        }
      } catch (error) {
        setAnimals([]);
        console.log(error);
      }
    };

    fetchAnimals();
  }, [searchString, searchParms]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const fetchCharacteristics = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/characteristics`
        );
        const data = await res.json();
        setCharacteristics(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCharacteristics();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = event.target?.value.replace(/\D/g, "");

    setValue(result);
  };
  {
    /**
  async function action(previousState, formData: FormData) {
    let resultString = "?";
    const selectedCharacteristics = formData.getAll("characteristics");
    const category = formData.get("selectedCategory");
    const sex = formData.get("selectedSex");
    const age = formData.get("inputAge");
    const race = formData.get("inputRace");

    if (selectedCharacteristics.length > 0) {
      selectedCharacteristics.forEach((Char) => {
        const Chara = characteristics?.find((c) => c._id === Char.toString());
        resultString = resultString.concat(
          "characteristics=",
          Chara?.characteristic,
          "&"
        );
      });
      resultString = resultString.substring(0, resultString.length - 1);
    }
    if (!(category.substring(0, 2) === "--")) {
      if (resultString.length > 1) {
        resultString = resultString.concat("&");
      }
      resultString = resultString.concat("category=", category);
    }
    if (!(sex.substring(0, 2) === "--")) {
      if (resultString.length > 1) {
        resultString = resultString.concat("&");
      }
      resultString = resultString.concat("sex=", sex);
    }
    if (age.length > 0) {
      if (resultString.length > 1) {
        resultString = resultString.concat("&");
      }
      resultString = resultString.concat("age=", age);
    }
    if (race.length > 0) {
      if (resultString.length > 1) {
        resultString = resultString.concat("&");
      }
      resultString = resultString.concat("race=", race);
    }
    setSearchString(resultString);
  }
  */
  }

  return (
    <>
      <main className="">
        <h1 className="mt-10 mb-10">
          Wir suchen ein Zuhause {slug && `- Rubrik: ${slug.toUpperCase()}`}
        </h1>

        <section id="Auswahl" className="mb-2">
          <form>
            <fieldset>
              <div className="w-full">
                <div className="border p-8 rounded-xl">
                  <h3 className="mb-3">
                    Filter für eingegebene Charaktereigenschaften des Tieres
                  </h3>
                  {characteristics?.map((char) => (
                    <label className="label mr-1" key={char._id}>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={searchParms
                          .getAll("characteristics")
                          .includes(char.characteristic)}
                        onChange={() => toggleCharacteristic(char._id)}
                      />
                      {char.characteristic}
                    </label>
                  ))}
                </div>

                <div className="border p-8 my-6 rounded-xl">
                  <h3 className="mb-3">
                    Hier können sie nach einer Tierart filtern
                  </h3>
                  {/* Auswahl Kategorien */}
                  <label htmlFor="Category" className="pl-5 pr-3">
                    Kategorie:
                  </label>

                  <select
                    name="category"
                    className="select w-44"
                    value={searchParms.get("category") ?? ""}
                    onChange={(e) => updateParam("category", e.target.value)}
                  >
                    <option value="">-- Kategorie wählen --</option>
                    {categories?.map((cat) => (
                      <option key={cat._id} value={cat.categoryName}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>

                  {/* Auswahl Geschlecht */}
                  <label htmlFor="Sex" className="pl-5 pr-3">
                    Geschlecht:
                  </label>

                  <select
                    name="sex"
                    className="select w-44"
                    value={searchParms.get("sex") ?? ""}
                    onChange={(e) => updateParam("sex", e.target.value)}
                  >
                    <option>-- Bitte wählen --</option>
                    <option key="männlich">männlich</option>
                    <option key="weiblich">weiblich</option>
                  </select>

                  {/* Eingabe Alter */}

                  <label htmlFor="Age" className="pl-5 pr-3">
                    Alter:
                  </label>
                  <input
                    name="Age"
                    type="text"
                    value={searchParms.get("age") ?? ""}
                    onChange={(e) =>
                      updateParam("age", e.target.value.replace(/\D/g, ""))
                    }
                    className="input w-18 mr-3"
                  />
                  {/* Eingabe Rasse */}

                  <label htmlFor="Race" className="pl-5 pr-3">
                    Rasse:
                  </label>
                  <input
                    name="race"
                    type="text"
                    className="input w-50 mr-3"
                    value={searchParms.get("race") ?? ""}
                    onChange={(e) => updateParam("race", e.target.value)}
                  />
                  <button type="submit" className="btn btn-neutral hidden">
                    Tiere suchen
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/tier-suchen")}
                    className="btn btn-neutral"
                  >
                    RESET
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </section>

        {/* KARTE ############################################################# */}
        <section>
          <AnimalsLocationMap
            key={location.search}
            search={location.search}
            url={searchString}
          />
        </section>

        {/* TIER CARDS ######################################################## */}
        <section className="grid xl:grid-cols-3 md:grid-cols-2 gap-9 mb-10">
          {animals?.map((animal) => (
            <CardAnimal key={animal._id} animal={animal}></CardAnimal>
          ))}
        </section>

        <div className="mt-10">
          <MainImage
            image="./img/Maeuse.jpg"
            headline="Tier vermitteln, Tier ein zu Hause geben"
            textColor="white"
            text="Finde ein neues Zuhause für dein Tier - Wir helfen!"
          />
        </div>
      </main>
    </>
  );
}
