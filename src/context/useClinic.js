import { useContext } from "react";
import { ClinicContext } from "./ClinicContextValue";

export function useClinic() {
  return useContext(ClinicContext);
}
