import { useContext } from "react";
import ToastContext from "../context/ToastContextValue";

export function useToast() {
  const showToast = useContext(ToastContext);

  if (showToast === null) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return showToast;
}
