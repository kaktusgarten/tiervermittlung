import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <main className="flex-flex-row max-lg:flex-col lg:w-2/5 m-auto">
        <div className=" bg-base-300 rounded-2xl p-4 mb-10 text-center mx-auto">
          <h1 className="mt-4 mb-4">Anmeldung</h1>
          <p className="px-1/3 mb-4">
            Sobald du dich angemeldet hast, stehen dir die Bereiche "Tier
            vermitteln" und "Meine Kontodaten", in denen du Deine
            Vermittlungsangebote und Interessenten einsehen kannst, zur
            verfügung.
          </p>
        </div>

        <LoginForm />
      </main>
    </>
  );
}
