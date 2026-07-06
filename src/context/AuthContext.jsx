import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }

    // Backend:
    // const token = localStorage.getItem("token");
    
  }, []);

  const signup = (name, email, password /* token */) => {
    // Backend:
    // localStorage.setItem("token",token);
    // localStorage.setItem(
    //   "currentUser",
    //   JSON.stringify(user)
    // );
    // setUser(user);

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
      name,
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

  
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = (email, password /* token */) => {
    // Backend:
    // localStorage.setItem("token", token);
    // localStorage.setItem(
    //   "currentUser",
    //   JSON.stringify(user)
    // );
    // setUser(user);
    // return true;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    // Backend:
    // localStorage.removeItem("token");

    localStorage.removeItem("currentUser");
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