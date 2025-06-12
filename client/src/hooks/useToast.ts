import { useCallback } from "react";
import type { ToastMessage } from "../components/ToastContainer";

declare global {
  interface Window {
    toast?: {
      success: (message: string, duration?: number) => void;
      error: (message: string, duration?: number) => void;
      warning: (message: string, duration?: number) => void;
      info: (message: string, duration?: number) => void;
    };
  }
}

export const useToast = () => {
  const show = useCallback(
    (type: ToastMessage["type"], message: string, duration?: number) => {
      if (typeof window !== "undefined" && window.toast) {
        window.toast[type](message, duration);
      }
    },
    []
  );

  return {
    success: (message: string, duration?: number) =>
      show("success", message, duration),
    error: (message: string, duration?: number) =>
      show("error", message, duration),
    warning: (message: string, duration?: number) =>
      show("warning", message, duration),
    info: (message: string, duration?: number) =>
      show("info", message, duration),
  };
};
