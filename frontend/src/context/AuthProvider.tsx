import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from ".";
import { login, me, logout } from "../data";

const authServiceURL = import.meta.env.VITE_APP_AUTH_SERVER_URL;

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [checkSession, setCheckSession] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleSignIn = async ({ email, password }: LoginInput) => {
    await login({ email, password });
    setSignedIn(true);
    setCheckSession(true);
  };

  const handleSignOut = async () => {
    await logout();
    setSignedIn(false);
    setUser(null);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await me();

        setUser(data);
        setSignedIn(true);
      } catch (error) {
        console.error(error);
        setSignedIn(false);
        setUser(null);
      } finally {
        setCheckSession(false);
        setLoading(false);
      }
    };
    if (checkSession) getUser();
  }, [checkSession]);

  // Add automatic token refresh every 14 minutes
  useEffect(() => {
    if (!signedIn) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${authServiceURL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });
        if (!res.ok) {
          setSignedIn(false);
          setUser(null);
        }
      } catch {
        setSignedIn(false);
        setUser(null);
      }
    }, 14 * 60 * 1000); // 14 minutes

    return () => clearInterval(interval);
  }, [signedIn]);

  const value: AuthContextType = {
    signedIn,
    user,
    handleSignIn,
    handleSignOut,
  };
  // Show loading state while checking session
  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
