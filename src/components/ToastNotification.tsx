import React from "react";
import { useToast } from "../contexts/ToastContext";

interface ToastItemProps {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({
  id,
  message,
  type,
  onRemove,
}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#d4edda";
      case "error":
        return "#f8d7da";
      case "info":
        return "#d1ecf1";
      case "warning":
        return "#fff3cd";
      default:
        return "#e2e3e5";
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "#c3e6cb";
      case "error":
        return "#f5c6cb";
      case "info":
        return "#bee5eb";
      case "warning":
        return "#ffeaa7";
      default:
        return "#d6d8db";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "#155724";
      case "error":
        return "#721c24";
      case "info":
        return "#0c5460";
      case "warning":
        return "#856404";
      default:
        return "#383d41";
    }
  };

  return (
    <div
      style={{
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        border: `1px solid ${getBorderColor()}`,
        borderRadius: "8px",
        padding: "12px 16px",
        marginBottom: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "14px",
        fontWeight: "500",
        animation: "slideIn 0.3s ease-out",
        maxWidth: "400px",
        wordBreak: "break-word",
      }}
    >
      <span>{message}</span>
      <button
        onClick={() => onRemove(id)}
        style={{
          background: "none",
          border: "none",
          color: getTextColor(),
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          marginLeft: "12px",
          padding: "0",
          opacity: 0.7,
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.7";
        }}
      >
        ×
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 10000,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onRemove={removeToast}
          />
        ))}
      </div>
    </>
  );
};
