import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}

interface ToastProps {
  message: ToastMessage;
  onDismiss: (id: string) => void;
}

const Toast = ({ message, onDismiss }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(message.id);
    }, message.duration || 5000);

    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  const baseClasses =
    "fixed right-4 min-w-[300px] p-4 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105";
  const typeClasses = {
    success: "bg-green-100 text-green-800 border border-green-200",
    error: "bg-red-100 text-red-800 border border-red-200",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    info: "bg-blue-100 text-blue-800 border border-blue-200",
  };

  return (
    <div
      className={`${baseClasses} ${typeClasses[message.type]}`}
      style={{ top: "1rem" }}
      role="alert"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">{message.message}</div>
        <button
          onClick={() => onDismiss(message.id)}
          className="ml-4 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export const ToastContainer = () => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addMessage = (message: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setMessages((prev) => [...prev, { ...message, id }]);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  useEffect(() => {
    // Expose the addMessage function globally
    (window as any).toast = {
      success: (message: string) => addMessage({ type: "success", message }),
      error: (message: string) => addMessage({ type: "error", message }),
      warning: (message: string) => addMessage({ type: "warning", message }),
      info: (message: string) => addMessage({ type: "info", message }),
    };

    return () => {
      delete (window as any).toast;
    };
  }, []);

  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed top-0 right-0 z-50 p-4 space-y-4">
      {messages.map((message) => (
        <Toast key={message.id} message={message} onDismiss={removeMessage} />
      ))}
    </div>,
    document.body
  );
};
