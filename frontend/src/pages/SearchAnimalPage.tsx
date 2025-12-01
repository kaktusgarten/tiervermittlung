import { useActionState, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";

import MainImage from "../components/MainImage";
import CardAnimal from "../components/CardAnimal";
import AnimalsLocationMap from "../components/AnimalsLocationMap";

export default function SearchAnimalPage() {
  const [animals, setAnimals] = useState<Animal[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [characteristics, setCharacteristics] = useState<Characteristic[]>();
  const [value, setValue] = useState("");
  const [searchString, setSearchString] = useState("");
  const [state, formAction] = useActionState(action, null);

  const { slug } = useParams<{ slug?: string }>();
  const [searchParms, setSearchParms] = useSearchParams();

  //  let navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const fullSearch = !searchString
          ? `?category=${searchParms.get("category")}`
          : searchString;

        const res = await fetch(
          //          `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/animals${searchString}`
          `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/animals${fullSearch}`
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

  return (
    <>
      <main className="">
        <h1 className="mt-10 mb-10">
          Wir suchen ein Zuhause {slug && `- Rubrik: ${slug.toUpperCase()}`}
        </h1>

        <section id="Auswahl" className="mb-2">
          <form action={formAction}>
            <fieldset>
              <div className="w-full">
                <div className="border border-amber-600">
                  <legend className="fieldset-legend">
                    Auswahl Characteristic
                  </legend>
                  {/* Checkboxen Characteristik */}
                  {!characteristics
                    ? ""
                    : characteristics?.map((char) => (
                        <label className="label mr-1" key={char._id}>
                          <input
                            name="characteristics"
                            value={char._id}
                            type="checkbox"
                            className="checkbox"
                            id={char._id}
                          />
                          {char.characteristic}
                        </label>
                      ))}
                </div>
                <div className="border border-blue-600">
                  {/* Auswahl Kategorien */}
                  <label htmlFor="Category" className="select w-20 mr-1 ">
                    Kategorie
                  </label>

                  <select
                    name="selectedCategory"
                    defaultValue="Auswahl Kategorie"
                    className="select w-44"
                  >
                    <option>-- Kategorie wählen --</option>
                    {!categories
                      ? ""
                      : categories?.map((cat) => (
                          <option key={cat._id}>{cat.categoryName}</option>
                        ))}
                  </select>
                  {/* Auswahl Geschlecht */}
                  <label
                    htmlFor="Sex"
                    className="input border border-amber-500 w-24 mr-1"
                  >
                    Geschlecht
                  </label>
                  <select
                    name="selectedSex"
                    defaultValue="Auswahl Geschlecht"
                    className="select w-44"
                  >
                    <option>-- Bitte wählen --</option>
                    <option key="männlich">männlich</option>
                    <option key="weiblich">weiblich</option>
                    <option key="egal">egal</option>
                  </select>
                  {/* Eingabe Alter */}
                  <label htmlFor="Age">
                    Alter
                    <input
                      name="inputAge"
                      type="text"
                      value={value}
                      onChange={handleChange}
                      className="input w-18 mr-3"
                    />
                  </label>
                  {/* Eingabe Rasse */}
                  <label htmlFor="Race">
                    Rasse
                    <input
                      name="inputRace"
                      type="text"
                      className="input w-50 mr-3"
                    />
                  </label>
                  <button type="submit" className="btn btn-neutral">
                    Tiere suchen
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </section>
        <section>
          <div className="h-120">
            <AnimalsLocationMap />
          </div>
        </section>
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
