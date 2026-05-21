import "./produtospage.css";
import { useEffect, useState } from "react";
import api from "../../Services/services";

const Produtos = () => {
    const [listaProdutos, setListaProdutos] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState(0);
    const [imagem, setImagem] = useState("");
    const [editar, setEditar] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    useEffect(() => {
        const getDados = async () => {
            try {
                const retornoAPI = await api.get("/produtos");

                setListaProdutos(retornoAPI.data);

            } catch (error) {
                console.log(error);
            }
        };

        getDados();
    }, []);

    const cadastrarProduto = async (e) => {
        e.preventDefault();

        if (
            titulo.trim().length === 0 ||
            descricao.trim().length === 0 ||
            isNaN(preco)
        ) {
            alert("Preencha todos os campos!");
            return;
        }

        const objProduto = {
            nome: titulo,
            descricao: descricao,
            preco: preco,
            imagem: imagem,
        };

        try {
            const retornoAPI = await api.post("/produtos",
                objProduto
            );

            const produtoCadastrado = retornoAPI.data;

            setListaProdutos([
                ...listaProdutos,
                produtoCadastrado
            ]);

            limparFormulario();

        } catch (error) {
            console.log(error);
        }
    };

    function limparFormulario() {
        setTitulo("");
        setDescricao("");
        setPreco(0);
        setImagem("");
    }

    const deletar = async (id) => {
        try {
            if(!confirm("Tem certeza que deseja deletar este produto?")) 
                return false;
            
            await api.delete(`/produtos/${id}`);

            setListaProdutos(
                listaProdutos.filter(
                    (produto) => produto.id !== id
                )
            );

        } catch (error) {
            console.log(error);
        }
    };

    const editarProduto = async (e) => {
        e.preventDefault();

        if (
            titulo.trim().length === 0 ||
            descricao.trim().length === 0 ||
            isNaN(preco)
        ) {
            alert("Preencha todos os campos!");
            return;
        }

        const objProduto = {
            nome: titulo,
            descricao: descricao,
            preco: preco,
            imagem: imagem,
        };

        try {
            const retornoAPI = await api.put(`/produtos/${idEditar}`,
                objProduto
            );

            const produtoAtualizado = retornoAPI.data;

            setListaProdutos(
                listaProdutos.map((produto) =>
                    produto.id === idEditar
                        ? produtoAtualizado
                        : produto
                )
            );

            setEditar(false);
            setIdEditar(null);

            limparFormulario();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="produtos">

            <h1 className="texto-produto">
                Cadastro de Produtos
            </h1>

            <div className="div-cadastro">

                <form
                    className="cadastro-formulario"
                    onSubmit={
                        editar
                            ? editarProduto
                            : cadastrarProduto
                    }
                >

                    <input
                        className="input-formulario"
                        type="text"
                        placeholder="Nome do Produto"
                        value={titulo}
                        onChange={(e) =>
                            setTitulo(e.target.value)
                        }
                    />

                    <input
                        className="input-formulario input-descricao"
                        type="text"
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) =>
                            setDescricao(e.target.value)
                        }
                    />

                    <input
                        className="input-formulario"
                        type="number"
                        placeholder="Preço"
                        value={preco}
                        onChange={(e) =>
                            setPreco(parseFloat(e.target.value))
                        }
                    />

                    <label
                        className="label_upload"
                        htmlFor="arquivo"
                    >
                        Imagem do Produto
                    </label>

                    <input
                        className="input-formulario btn_upload"
                        id="arquivo"
                        type="file"
                        onChange={(e) =>
                            setImagem(
                                "/" + e.target.files[0].name
                            )
                        }
                    />

                    {editar && (
                        <button
                            className="btn_cadastrar"
                            type="button"
                            onClick={() => {
                                setEditar(false);
                                setIdEditar(null);
                                limparFormulario();
                            }}
                        >
                            Cancelar
                        </button>
                    )}

                    <button className="btn_cadastrar">
                        {editar ? "Atualizar" : "Salvar"}
                    </button>

                </form>

                <div className="div-produto">

                    <section className="secao-produto">

                        {listaProdutos.map((produto) => (
                            <article
                                key={produto.id}
                                className="card__produto"
                            >

                                <img
                                    src={produto.imagem}
                                    className="img_produto"
                                    alt={produto.nome}
                                />

                                <h2>{produto.nome}</h2>

                                <span>
                                    <strong>Descrição:</strong>{" "}
                                    {produto.descricao}
                                </span>

                                <span>
                                    <strong>Preço:</strong> R$
                                    {produto.preco}
                                </span>

                                <button
                                    className="btn_deletar"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        deletar(produto.id);
                                    }}
                                >
                                    Deletar
                                </button>

                                <button
                                    className="btn_editar"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        setEditar(true);
                                        setIdEditar(produto.id);

                                        setTitulo(produto.nome);
                                        setDescricao(produto.descricao);
                                        setPreco(produto.preco);
                                        setImagem(produto.imagem);
                                    }}
                                >
                                    Editar
                                </button>

                            </article>
                        ))}

                    </section>

                </div>

            </div>

        </main>
    );
};

export default Produtos;