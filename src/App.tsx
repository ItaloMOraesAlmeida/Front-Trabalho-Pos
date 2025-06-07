import { useState } from "react";
import { EditForm } from "./components/editForm";

export interface Product {
  id: string;
  sku?: string;
  name: string;
  price: number | null;
  description?: string;
}

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [productEdit, setProductEdit] = useState<Product | null>(null);

  const getProducts = async () => {
    const response = await fetch("http://localhost:8083/product");

    const resutl = await response.json();

    setProducts(resutl);
  };

  const getProductBySku = async (sku: string) => {
    const response = await fetch(
      `http://localhost:8083/product/bySku?sku=${sku}`
    );

    const result = await response.json();

    setProduct(result);
  };

  const getProductBySkuEdit = async (sku: string) => {
    const response = await fetch(
      `http://localhost:8083/product/bySku?sku=${sku}`
    );

    const result = await response.json();

    setProductEdit(result);
  };

  console.log("Produto: ", product);

  return (
    <div>
      <h1>Hello Wolrd</h1>

      <button onClick={getProducts}>Get Products</button>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                textAlign: "left",
              }}
            >
              ID
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                textAlign: "left",
              }}
            >
              Nome
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                textAlign: "left",
              }}
            >
              Descrição
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                textAlign: "left",
              }}
            >
              Preço
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                textAlign: "left",
              }}
            >
              SKU
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                textAlign: "left",
              }}
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((produto) => (
            <tr key={produto.id}>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                {produto.id}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                {produto.name}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                {produto.description || "Sem descrição"}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                R$ {produto.price?.toFixed(2)}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                {produto.sku || "Sem SKU"}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button onClick={() => getProductBySku(produto?.sku ?? "")}>
                    Visualização
                  </button>
                  <button
                    onClick={() => getProductBySkuEdit(produto?.sku ?? "")}
                  >
                    Edição
                  </button>
                  <button>Exclusão</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {product && (
        <div>
          <h1>Detalhes do Produto</h1>

          <div>
            <p>Sku: {product.sku ?? "Sem SKU"}</p>
            <p>Nome: {product.name}</p>
            <p>Descrição: {product.description ?? "Sem Descrição"}</p>
            <p>Preço: R$ {product.price?.toFixed(2)}</p>
            <button
              onClick={() => {
                setProduct(null);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {productEdit && (
        <EditForm
          produto={productEdit}
          onCancel={() => {
            setProductEdit(null);
          }}
          onReload={getProducts}
        />
      )}
    </div>
  );
};
