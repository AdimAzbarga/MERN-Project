import { createContext } from "react";

export const LoginContext = createContext({
  isLoggedin: false,
  userId: null,
  name: null,
  Login: () => {},
  Logout: () => {},
});
