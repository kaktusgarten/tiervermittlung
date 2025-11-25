export default function MainImage() {
  return (
    <>
      <div
        className="-mx-8  border-[#c7c0ca]  mb-10 p-10 py-20 min-h-[300px]"
        style={{
          backgroundImage: 'url("./img/mood-bild-1.png")',
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "black",
        }}
      >
        <h1
          className="mb-5 text-white text-6xl"
          style={{ textShadow: "1px 1px 2px black" }}
        >
          Tierglück Vermittlung
        </h1>
        <p
          className="italic mb-6 text-2xl text-white"
          style={{ textShadow: "1px 1px 2px black" }}
        >
          Finde ein neues Zuhause für dein Tier - Wir helfen!
        </p>
      </div>
    </>
  );
}
