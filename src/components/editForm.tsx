import { useState } from "react";
import type { Product } from "../App";

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
  const [price, setPrice] = useState(produto?.price || "");
  const [description, setDescription] = useState(produto?.description || "");

  const handleSaveProduct = async (
    event?: React.FormEvent<HTMLFormElement>
  ) => {
    event?.preventDefault();

    const response = await fetch("http://localhost:8083/product", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sku: produto?.sku,
        name: name,
        price: price,
        description: description,
      }),
    });

    const result: IResultCreateProduct = await response.json();

    if (result.success) {
      alert("Produto atualizado com sucesso!");

      onReload();
      onCancel();
    } else {
      alert(result.message || "Erro ao atualizar o produto.");
    }
  };

  return (
    <div>
      <h1>Editar Produto</h1>

      <form
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        onSubmit={handleSaveProduct}
      >
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" style={{ width: "5%" }}>
            Salvar
          </button>
          <button onClick={onCancel} style={{ width: "6%" }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
