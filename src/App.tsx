import { useState, useEffect } from "react";
import { RegisterForm } from "./components/registerForm";
import { EditForm } from "./components/editForm";
import { ViewProduct } from "./components/viewProduct";
import { ConfirmationModal } from "./components/ConfirmationModal";
import { ToastContainer } from "./components/ToastNotification";
import { ToastProvider, useToast } from "./contexts/ToastContext";

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  description: string;
}

const AppContent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showViewProduct, setShowViewProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const { showToast } = useToast();

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8083/product");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowEditForm(true);
  };

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setShowViewProduct(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8083/product/${productToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        showToast("✅ Produto excluído com sucesso!", "success");
        loadProducts();
      } else {
        showToast("❌ Erro ao excluir o produto. Tente novamente.", "error");
      }
    } catch (error) {
      showToast("❌ Erro de conexão. Verifique sua internet.", "error");
    } finally {
      setShowDeleteConfirmation(false);
      setProductToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setShowRegisterForm(false);
    setShowEditForm(false);
    setShowViewProduct(false);
    setSelectedProduct(null);
  };

  return (
    <div style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "32px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            color: "white",
            margin: 0,
            fontSize: "32px",
            fontWeight: "700",
            textAlign: "center",
            letterSpacing: "1px",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          🛍️ Gerenciador de Produtos
        </h1>
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e9ecef",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#495057",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            📋 Lista de Produtos
          </h2>
          <button
            onClick={() => setShowRegisterForm(true)}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0056b3";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 16px rgba(0, 123, 255, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#007bff";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0, 123, 255, 0.3)";
            }}
          >
            ➕ Cadastrar Novo Produto
          </button>
        </div>

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
              fontSize: "18px",
              color: "#6c757d",
            }}
          >
            ⏳ Carregando produtos...
          </div>
        ) : products.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "64px 32px",
              color: "#6c757d",
              fontSize: "18px",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              border: "2px dashed #dee2e6",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
            <div style={{ fontSize: "20px", fontWeight: "600" }}>
              Nenhum produto cadastrado
            </div>
            <div style={{ marginTop: "8px" }}>
              Clique no botão "Cadastrar Novo Produto" para começar
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "24px",
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  backgroundColor: "#ffffff",
                  border: "2px solid #e9ecef",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#667eea";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e9ecef";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(0, 0, 0, 0.05)";
                }}
              >
                <div style={{ marginBottom: "16px" }}>
                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#495057",
                      lineHeight: "1.2",
                    }}
                  >
                    🏷️ {product.name}
                  </h3>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#6c757d",
                      fontFamily: "monospace",
                      backgroundColor: "#f8f9fa",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      display: "inline-block",
                    }}
                  >
                    SKU: {product.sku || "N/A"}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "#28a745",
                    marginBottom: "12px",
                  }}
                >
                  💰 R$ {product.price.toFixed(2)}
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#6c757d",
                    marginBottom: "20px",
                    lineHeight: "1.4",
                    minHeight: "40px",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  📄 {product.description || "Sem descrição"}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    onClick={() => handleView(product)}
                    style={{
                      backgroundColor: "#17a2b8",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      flex: 1,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#138496";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#17a2b8";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    👁️ Ver
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    style={{
                      backgroundColor: "#ffc107",
                      color: "#212529",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      flex: 1,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#e0a800";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffc107";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      flex: 1,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#c82333";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#dc3545";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    🗑️ Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showRegisterForm && (
        <RegisterForm onCancel={handleCloseModal} onReload={loadProducts} />
      )}

      {showEditForm && selectedProduct && (
        <EditForm
          produto={selectedProduct}
          onCancel={handleCloseModal}
          onReload={loadProducts}
        />
      )}

      {showViewProduct && selectedProduct && (
        <ViewProduct produto={selectedProduct} onCancel={handleCloseModal} />
      )}

      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o produto "${productToDelete?.name}"?`}
        details={
          productToDelete
            ? [
                `Nome: ${productToDelete.name}`,
                `SKU: ${productToDelete.sku || "N/A"}`,
                `Preço: R$ ${productToDelete.price.toFixed(2)}`,
                "⚠️ Esta ação não pode ser desfeita!",
              ]
            : []
        }
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteConfirmation(false);
          setProductToDelete(null);
        }}
        confirmText="🗑️ Sim, Excluir"
        cancelText="✖️ Cancelar"
        type="danger"
      />

      <ToastContainer />
    </div>
  );
};

export const App = () => {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
};
