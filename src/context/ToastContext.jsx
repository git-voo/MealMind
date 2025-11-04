import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const colorMap = {
    success: "#81C784",   // green
    info: "#FF9800",      // orange
    error: "#E57373",     // red
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className="fixed top-5 left-1/2 -translate-x-1/2 shadow-lg px-5 py-3 rounded-xl flex items-center gap-2 animate-fade-in text-white"
          style={{ backgroundColor: colorMap[toast.type] || colorMap.info }}
        >
          <span>🌿</span>
          <p className="text-sm">{toast.message}</p>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
