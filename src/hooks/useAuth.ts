import { useContext } from "react";
import { AuthContext } from "../hocs/AuthProvider";
import { TValue } from "../types";

export function useAuth() {
  return useContext(AuthContext) as TValue;
}
