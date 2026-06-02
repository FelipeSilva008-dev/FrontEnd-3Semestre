
import {  useState } from "react";
import { ProdutoContext } from "./ProdutoContext";

//disponibiliza o state do usuário de forma global para
//todos os seus componenetes filhos ( children )
export const ProdutoProvider = ({children}) => {
    const [listaProduto, setListaProduto] = useState([
        "Xiaomi Redmi Note 14 Pro",
    ])
    return(
        <ProdutoContext.Provider
           value={{
            listaProduto,
            setListaProduto
           }}
        >
            {children}
        </ProdutoContext.Provider>
    )
}