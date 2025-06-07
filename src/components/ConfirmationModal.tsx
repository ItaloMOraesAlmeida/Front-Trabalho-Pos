import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  details?: string[];
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: "warning" | "danger" | "info";
  isDanger?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  details,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "info",
  isDanger = false,
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "warning":
        return {
          icon: "⚠️",
          headerColor: "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)",
          confirmColor: "#ff9800",
          borderColor: "#ff9800",
        };
      case "danger":
        return {
          icon: "🗑️",
          headerColor: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
          confirmColor: "#f44336",
          borderColor: "#f44336",
        };
      default:
        return {
          icon: "ℹ️",
          headerColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          confirmColor: "#667eea",
          borderColor: "#667eea",
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
        backdropFilter: "blur(8px)",
        animation: "fadeIn 0.3s ease-out",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "0",
          maxWidth: "500px",
          width: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
          border: `2px solid ${typeStyles.borderColor}`,
          position: "relative",
          animation: "slideIn 0.3s ease-out",
          transform: "translateY(0)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: typeStyles.headerColor,
            padding: "24px 32px",
            borderRadius: "14px 14px 0 0",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "28px" }}>{typeStyles.icon}</span>
            <h2
              style={{
                color: "white",
                margin: 0,
                fontSize: "20px",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "0 32px 32px 32px" }}>
          {/* Message */}
          <div
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              border: "1px solid #e9ecef",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "16px",
                lineHeight: "1.5",
                color: "#495057",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              {message}
            </p>
          </div>

          {/* Details */}
          {details && details.length > 0 && (
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "24px",
                border: "1px solid #dee2e6",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              }}
            >
              <h4
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#6c757d",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                📋 Detalhes:
              </h4>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {details.map((detail, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "6px",
                      fontSize: "14px",
                      color: "#495057",
                      borderLeft: `3px solid ${typeStyles.borderColor}`,
                    }}
                  >
                    {detail}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Danger Warning */}
          {isDanger && (
            <div
              style={{
                backgroundColor: "#fff3cd",
                borderRadius: "8px",
                padding: "12px 16px",
                marginBottom: "20px",
                border: "1px solid #ffeaa7",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "18px" }}>⚠️</span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#856404",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Esta ação é irreversível!
              </span>
            </div>
          )}

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <button
              onClick={onCancel}
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(108, 117, 125, 0.3)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                minWidth: "100px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#5a6268";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 16px rgba(108, 117, 125, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#6c757d";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(108, 117, 125, 0.3)";
              }}
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              style={{
                backgroundColor: typeStyles.confirmColor,
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: `0 4px 12px ${typeStyles.confirmColor}40`,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                minWidth: "100px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 6px 16px ${typeStyles.confirmColor}60`;
                e.currentTarget.style.filter = "brightness(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 4px 12px ${typeStyles.confirmColor}40`;
                e.currentTarget.style.filter = "brightness(1)";
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideIn {
            from { 
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to { 
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};
