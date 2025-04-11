import { useEffect } from "react";
import "./ToastNotification.scss";

interface ToastProps {
  message: string | null;
  type?: "error" | "success";
  duration?: number;
  onClose: () => void;
}

const ToastNotification = ({
  message,
  type = "error",
  duration = 3000,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast-notification ${type}`}>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default ToastNotification;
