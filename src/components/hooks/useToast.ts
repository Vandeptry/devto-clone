// src/components/hooks/useToast.ts
import toast, { ToastOptions } from "react-hot-toast";

export const useToast = () => {
  const toaster = {
    success: (message: string, options?: ToastOptions) =>
      toast.success(message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        ...options,
      }),
    error: (message: string, options?: ToastOptions) =>
      toast.error(message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        ...options,
      }),
    loading: (message: string, options?: ToastOptions) =>
      toast.loading(message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        ...options,
      }),
  };

  return { toaster, dismiss:toast.dismiss };
};