import { Link, useNavigate } from "react-router";
//import { useActionState, use, useState } from "react";
import React, { useState } from "react";
//import { GesamtseitenContext } from "../context/GesamtseitenContext";
import { useAuth } from "../context";
//import { toast } from "react-toastify";

export default function LoginForm() {
  const navigate = useNavigate();

  const { signedIn, handleSignIn } = useAuth();
  const [{ email, password }, setForm] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email || !password) throw new Error("All fields are required");
      setLoading(true);

      await handleSignIn({ email, password });
      //toast.success("Login successful!");

      navigate("/");
    } catch (error: unknown) {
      alert("Fehler beim Anmelden!");
      const message = (error as { message: string }).message;
      console.log(message);

      //toast.error(message);
    } finally {
      setLoading(false);

      if (signedIn) {
        navigate("/");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-100 border-base rounded-box border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Email</label>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="E-Mail"
            className="input w-[100%]"
            disabled={loading}
          />

          <label className="label">Passwort</label>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            className="input  w-[100%]"
            placeholder="Passwort"
            disabled={loading}
          />

          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={loading}
          >
            Anmelden
          </button>

          <p className="m-3">
            <Link to="/registrierung">
              Du hast noch kein Konto?{" "}
              <span className="underline">Hier Registrieren!</span>
            </Link>
          </p>
        </fieldset>
      </form>
    </>
  );
}
