import { useContext, useState } from "react"
import { ProdutoContext } from "../../context/ProdutoContext"

const CadastroProduto = () => {
    //contextos globais
    const { listaProdutos, setListaProdutos } = useContext(ProdutoContext)
    //states locais
    const [novoProduto, setNovoProduto] = useState("")

    return (
        <div>
            <h2>Cadastro de Produto</h2>
            <input type="text"
            value={novoProduto}
                onChange={(e) => {
                    setNovoProduto(e.target.value)
                }}
            />

            <button onClick={() => {
                setListaProdutos([...listaProdutos, novoProduto])
                setNovoProduto("")
                alert("Produto Cadastrado com Sucesso!")
            }}
            >
                Cadastrar
            </button>

            <p>Produto que será cadastrado: {novoProduto}</p>
        </div>
    )
}

export default CadastroProduto