import { useEffect, useState } from "react";
import { useParams } from "react-router";

import MainImage from "../components/MainImage";
import CardAnimal from "../components/CardAnimal";

export default function SearchAnimalPage() {
  const [animals, setAnimals] = useState<Animal[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [characteristics, setCharacteristics] = useState<Characteristic[]>();

  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_AUTH_SERVER_URL}/animals`
        );
        const data = await res.json();
        setAnimals(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnimals();
  }, []);

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
        console.log("Daten: ", data);
        setCharacteristics(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCharacteristics();
  }, []);

  const formAction = () => {
    alert("formAction");
  };

  return (
    <>
      <main className="">
        <h1 className="mt-10 mb-10">
          Wir suchen ein Zuhause {slug && `- Rubrik: ${slug.toUpperCase()}`}
        </h1>

        <section id="Auswahl" className="mb-2">
          <h3>Test</h3>
          <form action={formAction}>
            <fieldset>
              <div className="w-52">
                <legend className="fieldset-legend">
                  Auswahl Characteristic
                </legend>
                <label className="label">
                  <input type="checkbox" className="checkbox" />
                  C1
                </label>
              </div>

              <label htmlFor="Category" className="input w-18 mr-3">
                Kategorie
              </label>
              <select defaultValue="Auswahl Kategorie" className="select">
                <option disabled={true}>Kategorie</option>
                {categories?.map((cat) => (
                  <option>{cat.categoryName}</option>
                ))}
              </select>

              <button type="submit" className="btn">
                Tiere suchen
              </button>
            </fieldset>
          </form>
        </section>
        <section className="grid xl:grid-cols-3 md:grid-cols-2 gap-9 mb-10">
          {animals?.map((animal) => (
            <CardAnimal animal={animal}></CardAnimal>
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
