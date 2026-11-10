import { useEffect, useState } from "react";
import ToastContext from "./ToastContextValue";

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast({ message });
  };

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setToast(null);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [toast]);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-10 max-w-[calc(100vw-48px)] rounded-lg bg-[#1b7a46] px-[18px] py-3 text-[0.9rem] text-white shadow-[0_4px_14px_rgb(23_36_59_/_20%)]" role="status" aria-live="polite">
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}
