import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

interface AuthContextData {
  token: string | null;
  authenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    console.debug("Token changed", token);
    if (token) {
      const fetchUser = async () => {
        try {
          await api.get("/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setAuthenticated(true);
        } catch (error) {
          logout();
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setAuthenticated(false);
      setLoading(false);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post("/user/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      setAuthenticated(true);
      api.defaults.headers.Authorization = `Bearer ${token}`;
    } catch (error: Error | any) {
      setAuthenticated(false);
      error.data = error.response.data.data;
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, authenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
