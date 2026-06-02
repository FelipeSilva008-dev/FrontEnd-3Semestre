import { useContext } from "react";
import { ProdutoContext } from "../../context/ProdutoContext";

const ListarProduto = () => {
    const { listaProduto } = useContext(ProdutoContext);

    return (
        <div>
            <h2>Lista de Produtos</h2>

            {listaProduto.map((produto, index) => (
                <p key={index}>{produto}</p>
            ))}
        </div>
    );
};

export default ListarProduto;