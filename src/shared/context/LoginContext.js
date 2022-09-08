import { createContext } from "react";

export const LoginContext = createContext({
  isLoggedin: false,
  Login: () => {},
  Logout: () => {},
});
