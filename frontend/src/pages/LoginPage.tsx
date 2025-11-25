import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <main className="p-4">
        <h1 className="mb-2">Anmeldung</h1>
        <div className="max-w-[600px] w-[100%] mx-auto">
          <LoginForm />
        </div>
      </main>
    </>
  );
}
