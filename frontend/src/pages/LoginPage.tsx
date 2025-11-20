import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <main className="p-4">
        <h2 className="mb-2 text-3xl">Login</h2>
        <div className="max-w-[600px] w-[100%] mx-auto">
          <LoginForm />
        </div>
      </main>
    </>
  );
}
