import { createContext } from "react";

type ToastContextValue = ((message: string) => void) | null;

const ToastContext = createContext<ToastContextValue>(null);

export default ToastContext;
