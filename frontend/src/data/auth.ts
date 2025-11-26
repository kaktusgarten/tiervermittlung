import { authServiceURL } from "../utils";

type SuccessRes = {
  message: string;
};

const login = async (formData: LoginInput): Promise<SuccessRes> => {
  const res = await fetch(`${authServiceURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  if (!res.ok) throw new Error(`${res.status} Something went wrong!`);

  const data = await res.json();

  return data;
};

const me = async (): Promise<User> => {
  const res = await fetch(`${authServiceURL}/auth/me`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error(`${res.status} Something went wrong!`);

  const { user } = await res.json();

  return user as User;
};

const logout = async (): Promise<SuccessRes> => {
  const res = await fetch(`${authServiceURL}/auth/logout`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

  const data = (await res.json()) as SuccessRes;
  // console.log(data);

  return data;
};

export { login, me, logout };
