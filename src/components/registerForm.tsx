import { useState } from "react";
import type { Product } from "../App";

interface IRegisterFormProps {
    onCancel: () => void;
    onReload: () => void;
}

export interface IResultCreateProduct {
    success: boolean;
    message?: string;
}

export const RegisterForm = ({onCancel, onReload}:IRegisterFormProps) => {
    const [sku, setSku] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState(""); 

    const handlerRegisterProduct = async (event?: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        const response = await fetch("http://localhost:8083/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sku,
                name,
                price: price,
                description: description,
            }),
        });
    const result: IResultCreateProduct = await response.json();
        if (result.success) {
            alert("Produto cadastrado com sucesso!");
            onReload();
            onCancel();
        }else {
            alert(result.message || "Erro ao cadastrar o produto.");
        }
    }

    
    return (
        <div>
            <h1>Cadastrar Produto</h1>
            <form onSubmit={handlerRegisterProduct}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div>
                    <label htmlFor="sku">SKU: </label>
                    <input type="text" id="sku" name="sku" value={sku} 
                    onChange={event => setSku(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" value={name}
                    onChange={(event)=>setName(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="price">Price: </label>
                    <input type="number" id="price" name="price" value={price}
                    onChange={(event)=>setPrice(Number(event.target.value))} />
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <textarea id="description" name="description" value={description}
                    onChange={event=>setDescription(event.target.value)}></textarea>
                </div>
                <button type="submit">Cadastrar</button>
                <button type="button" onClick={onCancel}>Cancelar</button>
            </form>

        </div>
    );

};