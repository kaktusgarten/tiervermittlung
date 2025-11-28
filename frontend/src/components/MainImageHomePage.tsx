export default function MainImageHomePage({
  image,
  headline,
  textColor,
  text,
}: {
  image: string;
  headline: string;
  textColor?: string; // optional
  text: string;
}) {
  return (
    <div
      className="md:-mx-8 sm:-mx-3 -mx-4 border-[#c7c0ca] px-10 py-3 min-h-[300px] overflow-hidden"
      style={{
        backgroundImage: `url("${image}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "black",
      }}
    >
      <section className="flex items-center">
        <div>
          {" "}
          <img
            src="./img/logo-rund-transparent.png"
            className="w-[250px] object-contain m-7"
          />
        </div>

        <div>
          <h1
            className={`mb-5 text-${textColor} text-6xl`}
            style={{ textShadow: "1px 1px 2px black" }}
          >
            {headline}
          </h1>

          <p
            className={`italic mb-6 text-3xl text-${textColor}`}
            style={{ textShadow: "1px 1px 2px black" }}
          >
            {text}
          </p>
        </div>
      </section>
    </div>
  );
}
