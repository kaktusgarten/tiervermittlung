import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <main className="">
        <h1 className="mt-10 mb-4">Anmeldung</h1>
        <p className="mb-9">
          Sobald du dich angemeldet hast, stehen dir die Bereiche "Tier
          vermitteln" und "Meine Kontodaten",<br></br> in denen du Deine
          Vermittlungsangebote und Interessenten einsehen kannst, zur verfügung.
        </p>
        <div className="max-w-[600px] w-[100%] mx-auto">
          <LoginForm />
        </div>
      </main>
    </>
  );
}
