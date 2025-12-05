const authServiceURL = import.meta.env.VITE_APP_AUTH_SERVER_URL;
const originalFetch = window.fetch;

export async function refreshAccessToken(): Promise<boolean> {
  try {
    const res = await fetch(`${authServiceURL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}

if (!authServiceURL) {
  console.error("No auth service set");
}

window.fetch = async (url, options, ...rest) => {
  let res = await originalFetch(
    url,
    {
      ...options,
      // this can cause errors if fetching to 3rd-party APIs with different CORS policies
      credentials: "include",
    },
    ...rest
  );
  const authHeader = res.headers.get("www-authenticate");

  if (authHeader?.includes("token_expired")) {
    console.log("ATTEMPT REFRESH");
    const refreshRes = await originalFetch(`${authServiceURL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) throw new Error("Login required");

    res = await originalFetch(
      url,
      {
        ...options,
        // this can cause errors if fetching to 3rd-party APIs with different CORS policies
        credentials: "include",
      },
      ...rest
    );
  }
  return res;
};

export { authServiceURL };
