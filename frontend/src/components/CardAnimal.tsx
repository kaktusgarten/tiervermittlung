import { useNavigate } from "react-router";

export default function CardAnimal({ animal }) {
  const navigate = useNavigate();
  const handleDetailsClick = () => {
    navigate(`/details/${animal._id}`);
  };
  return (
    <>
      <article
        key={animal._id}
        className="CARD rounded-2xl bg-[#c7c0ca] text-black flex flex-col"
      >
        <img
          src={animal.image_url[0]}
          alt="Tier sucht Zuhause"
          className="rounded-t-2xl object-cover h-[360px]"
        />

        <div className="p-5 font-medium">
          <div className="flex items-center mb-7">
            <h3 className="text-1xl font-bold inline">
              ❤ Ich bin {animal.name}
            </h3>
          </div>

          <div className="mb-7 flex justify-between">
            {/*  Rasse ################################  */}
            <div className="flex">
              <img
                src="./img/icon-rasse.png"
                className="mr-2 w-[25px] object-contain"
              />
              <span>Rasse: {animal.race}</span>
            </div>

            {/*  Alter ################################  */}
            <div className="flex">
              <img
                src="./img/icon-age.svg"
                className="mr-2 w-[20px] object-contain"
              />
              <span>Alter: {animal.age} Jahre</span>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              className="rounded-md bg-[#2B1B12] text-white px-4 py-2 cursor-pointer"
              onClick={handleDetailsClick}
            >
              Details
            </button>

            <div className="flex items-center">
              <img
                src="./img/icon-standort.svg"
                className="mr-2 w-[20px] object-contain"
              />
              <strong>Standort: xxxxx</strong>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
