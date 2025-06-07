import type { Product } from "../App";
import { formatCurrency } from "../utils/formatters";

export const ViewProduct = ({
  produto,
  onCancel,
}: {
  produto: Product | null;
  onCancel: () => void;
}) => (
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
        maxWidth: "500px",
        width: "90%",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
        transform: "translateY(0)",
        transition: "all 0.3s ease",
        border: "1px solid #e9ecef",
        position: "relative",
        overflow: "hidden",
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
          📦 Detalhes do Produto
        </h1>
      </div>

      {/* Conteúdo do produto */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Seção da imagem do produto */}
        {produto?.image && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "8px",
            }}
          >
            <img
              src={`http://localhost:8083/product/image/${produto.image}`}
              alt={produto.name}
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                objectFit: "contain",
                borderRadius: "12px",
                border: "1px solid #e9ecef",
                backgroundColor: "#f8f9fa",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 6px 16px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0, 0, 0, 0.1)";
              }}
            />
          </div>
        )}

        {/* Card de informação */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #e9ecef",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: "16px",
            }}
          >
            {/* SKU */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: "1px solid #dee2e6",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  color: "#495057",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                🏷️ SKU:
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  backgroundColor: "#e9ecef",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  color: "#6c757d",
                  fontWeight: "500",
                }}
              >
                {produto?.sku ?? "Sem SKU"}
              </span>
            </div>

            {/* Nome */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: "1px solid #dee2e6",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  color: "#495057",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                📝 Nome:
              </span>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#212529",
                }}
              >
                {produto?.name}
              </span>
            </div>

            {/* Descrição */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: "12px 0",
                borderBottom: "1px solid #dee2e6",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  color: "#495057",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginRight: "16px",
                  minWidth: "100px",
                }}
              >
                📄 Descrição:
              </span>
              <span
                style={{
                  fontSize: "14px",
                  color: "#6c757d",
                  textAlign: "right",
                  lineHeight: "1.5",
                  maxWidth: "250px",
                }}
              >
                {produto?.description ?? "Sem Descrição"}
              </span>
            </div>

            {/* Preço */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  color: "#495057",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                💰 Preço:
              </span>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#28a745",
                  backgroundColor: "#d4edda",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid #c3e6cb",
                }}
              >
                {produto?.price ? formatCurrency(produto.price) : "R$ 0,00"}
              </span>
            </div>
          </div>
        </div>

        {/* Botão de cancelar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <button
            onClick={onCancel}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              padding: "12px 32px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(108, 117, 125, 0.3)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
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
            ✖️ Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
);
