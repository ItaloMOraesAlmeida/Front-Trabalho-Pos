import { useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";
import { useToast } from "../contexts/ToastContext";
import type { Product } from "../App";
import { formatCurrency } from "../utils/formatters";

interface IEditFormProps {
  produto: Product | null;
  onCancel: () => void;
  onReload: () => void;
}

export interface IResultCreateProduct {
  success: boolean;
  message?: string;
}

export const EditForm = ({ produto, onCancel, onReload }: IEditFormProps) => {
  const [name, setName] = useState(produto?.name || "");
  const [price, setPrice] = useState(produto?.price?.toString() || ""); // Converte para string
  const [description, setDescription] = useState(produto?.description || "");
  const [sku, setSku] = useState(produto?.sku || "");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();

  const handleSaveProduct = async (
    event?: React.FormEvent<HTMLFormElement>
  ) => {
    event?.preventDefault();
    setShowConfirmation(true);
  };

  const confirmSave = async () => {
    setShowConfirmation(false);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8083/product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: produto?.id,
          sku,
          name: name,
          price: Number(price), // Converte para number no envio
          description: description,
        }),
      });

      const result: IResultCreateProduct = await response.json();

      if (result.success) {
        showToast("✅ Produto atualizado com sucesso!", "success");
        onReload();

        // Aguarda um pouco para garantir que o toast seja exibido antes de fechar o modal
        setTimeout(() => {
          onCancel();
        }, 500);
      } else {
        showToast(
          result.message || "❌ Erro ao atualizar o produto. Tente novamente.",
          "error"
        );
      }
    } catch (error) {
      showToast("❌ Erro de conexão. Verifique sua internet.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={showConfirmation}
        title="Confirmar Alterações"
        message="Tem certeza que deseja salvar as alterações do produto?"
        details={[
          `Nome: ${name}`,
          `Preço: ${formatCurrency(Number(price || 0))}`,
          `SKU: ${sku || "Não informado"}`,
          `Descrição: ${description || "Não informada"}`,
        ]}
        onConfirm={confirmSave}
        onCancel={() => setShowConfirmation(false)}
        confirmText="💾 Salvar"
        cancelText="✖️ Cancelar"
        type="info"
      />

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          backdropFilter: "blur(5px)",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "32px",
            maxWidth: "600px",
            width: "90%",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            border: "1px solid #e9ecef",
            position: "relative",
          }}
        >
          {/* Header com gradiente */}
          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              margin: "-32px -32px 24px -32px",
              padding: "24px 32px",
              borderRadius: "16px 16px 0 0",
            }}
          >
            <h1
              style={{
                color: "white",
                margin: 0,
                fontSize: "24px",
                fontWeight: "600",
                textAlign: "center",
                letterSpacing: "0.5px",
              }}
            >
              ✏️ Editar Produto
            </h1>
          </div>

          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            onSubmit={handleSaveProduct}
          >
            {/* Campo SKU */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <label
                htmlFor="sku"
                style={{
                  fontWeight: "600",
                  color: "#495057",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                🏷️ SKU:
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={sku}
                onChange={(event) => {
                  setSku(event.target.value);
                }}
                style={{
                  padding: "12px 16px",
                  border: "2px solid #e9ecef",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontFamily: "monospace",
                  backgroundColor: "#f8f9fa",
                  transition: "all 0.3s ease",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#667eea";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e9ecef";
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Campo Nome */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <label
                htmlFor="name"
                style={{
                  fontWeight: "600",
                  color: "#495057",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                📝 Nome:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                required
                style={{
                  padding: "12px 16px",
                  border: "2px solid #e9ecef",
                  borderRadius: "8px",
                  fontSize: "14px",
                  backgroundColor: "#f8f9fa",
                  transition: "all 0.3s ease",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#667eea";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e9ecef";
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Campo Preço */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <label
                htmlFor="price"
                style={{
                  fontWeight: "600",
                  color: "#495057",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                💰 Preço:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value); // Mantém como string
                }}
                step="0.01"
                min="0"
                required
                style={{
                  padding: "12px 16px",
                  border: "2px solid #e9ecef",
                  borderRadius: "8px",
                  fontSize: "14px",
                  backgroundColor: "#f8f9fa",
                  transition: "all 0.3s ease",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#667eea";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e9ecef";
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Campo Descrição */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <label
                htmlFor="description"
                style={{
                  fontWeight: "600",
                  color: "#495057",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                📄 Descrição:
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                rows={4}
                style={{
                  padding: "12px 16px",
                  border: "2px solid #e9ecef",
                  borderRadius: "8px",
                  fontSize: "14px",
                  backgroundColor: "#f8f9fa",
                  transition: "all 0.3s ease",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#667eea";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e9ecef";
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Botões */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                marginTop: "8px",
              }}
            >
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  backgroundColor: isLoading ? "#6c757d" : "#28a745",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  boxShadow: `0 4px 12px ${
                    isLoading
                      ? "rgba(108, 117, 125, 0.3)"
                      : "rgba(40, 167, 69, 0.3)"
                  }`,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  minWidth: "120px",
                  opacity: isLoading ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = "#218838";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 16px rgba(40, 167, 69, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = "#28a745";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(40, 167, 69, 0.3)";
                  }
                }}
              >
                {isLoading ? "⏳ Salvando..." : "💾 Salvar"}
              </button>
              <button
                type="button"
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
                  minWidth: "120px",
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
                ✖️ Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
