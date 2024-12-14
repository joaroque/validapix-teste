import { useEffect, useState } from "react";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  function saveToken(t: string) {
    localStorage.setItem("token", t);
    setToken(t);
  }

  function clearToken() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return { token, saveToken, clearToken };
}
