import { createContext, useEffect, useState } from "react";
import { signupUser, loginUser, getCurrentUser} from "../services/authService";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
     const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await getCurrentUser(token);
        setUser(response.data.user);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    loadUser();
    
  }, []);



  const signup = async (name, email, password) => {
    try {
      await signupUser({
        name,
        email,
        password,
      });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  

  const login = async (email, password) => {
     try {
      const response = await loginUser({
        email,
        password,
      });

      const { user, token } = response.data;

      localStorage.setItem("token", token);

      setUser(user);

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}