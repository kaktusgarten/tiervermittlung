import { useNavigate } from "react-router";

export default function DetailAnimal({ animal }) {
  console.log(animal);
  const navigate = useNavigate();
  const handleDetailsClick = () => {
    navigate(`/details/${animal._id}`);
  };
  return (
    <>
      <article className="grid grid-cols-1 lg:[grid-template-columns:1fr_2fr_auto] md:[grid-template-columns:1fr_1fr] gap-4 mb-10">
        {/* 1. BLOCK ################################### */}
        <div className="pb-8">
          <img
            src={animal.image_url[0]}
            alt="Tier sucht Zuhause"
            className="object-cover object-center w-[100%] aspect-square bg-base-300"
          />
        </div>
        {/* 2. BLOCK ################################### */}
        <div className="sm:px-8">
          <h3>Über {animal.name}</h3>
          <p className="mb-6">{animal.description}</p>

          <h3>Eigenschaften von {animal.name} </h3>
          <ul className="list-disc pl-8 text-xl">
            {animal.characteristics.map((eigenschaft: any) => (
              <li>{eigenschaft}</li>
            ))}
          </ul>
        </div>

        {/* 3. BLOCK ################################### */}
        <div className="sm:px-4 sm:pl-8 pb-10">
          {/* NAME #### */}
          <div className="">
            <h3 className="">❤ Ich bin {animal.name}</h3>
          </div>

          <div className="">
            {/*  Rasse ####  */}
            <div className="flex mb-2">
              <img
                src="/img/icon-age.svg"
                className="mr-2 w-[25px] object-contain"
              />
              <p>Rasse: {animal.race}</p>
            </div>

            {/*  Alter ####  */}
            <div className="flex mb-2">
              <img
                src="/img/icon-age.svg"
                className="mr-2 w-[20px] object-contain"
              />
              <p>Alter: {animal.age} Jahre</p>
            </div>

            {/*  Geschlecht #####  */}
            <div className="flex mb-2">
              <img
                src="/img/icon-age.svg"
                className="mr-2 w-[20px] object-contain"
              />
              <p>Geschlecht: {animal.sex}</p>
            </div>

            {/*  Standort ####  */}
            <div className="flex mb-2">
              <img
                src="/img/icon-standort.svg"
                className="mr-2 w-[20px] object-contain"
              />
              <p>Standort: {animal.owner.city}</p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
