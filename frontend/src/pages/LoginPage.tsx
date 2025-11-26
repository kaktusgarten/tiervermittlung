import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <main className="">
        <h1 className="mt-10 mb-4">Anmeldung</h1>
        <div className="max-w-[600px] w-[100%] mx-auto">
          <LoginForm />
        </div>
      </main>
    </>
  );
}
