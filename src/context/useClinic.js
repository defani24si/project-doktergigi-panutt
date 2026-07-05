import { useContext } from "react";
import { ClinicContext } from "./ClinicContext";

export function useClinic() {
  return useContext(ClinicContext);
}
