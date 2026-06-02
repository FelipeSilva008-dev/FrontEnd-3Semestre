import "./CadastroFilme.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro"
import { useEffect, useState } from "react";
import api from "../../services/services";
import Lista from "../../components/lista/Lista"
import Swal from "sweetalert2"; //biblioteca de alertas

import { Alerta } from "../../components/alerta/Alerta";

const CadastroFilme = () => {

    const [listaGeneros, setListaGeneros] = useState([])
    const [generoSelecionado, setGeneroSelecionado] = useState("");
    const [valor, setValor] = useState("")
    const [idEditar, setIdEditar] = useState(0)
    const [editar, setEditar] = useState(false)
    const [listaFilmes, setListaFilmes] = useState([
        // {
        //     nome: "Robinho JR documentario",
        //     id: "UDBrLzWRf9c",
        //     genero: {nome: "Documentário"}
        // }
    ])

    //ciclo de vida e funções 

    //POST
    const funcCadastro = async (e) => {
        e.preventDefault();
        //validação dos dados preenchidos
        if (valor.trim().length == 0) {
            Alerta({
                title: "Cadastro de Filme",
                text: "Filme deve ser preenchido antes de cadastrar.",
                icon: "warning",
                confirmButtonText: "OK"
            });
            return false
        }

        const objCadastro = {
            titulo: valor,
            genero: {
                nome: generoSelecionado
            }

        }

        try {
            //cadastra na api, no endpoint do swageer
            const retornoAPI = await api.post("/Filme", objCadastro)
            if (retornoAPI.status == 201 || retornoAPI.status === 200) {
                Alerta({
                    title: "Cadastro de Filme",
                    text: `Filme "${objCadastro.titulo}" foi cadastrado com sucesso!!`,
                    icon: "success",
                    confirmButtonText: "OK"
                });

                //limpar os campos 
                limparFormulario();

                //chamar o getFilme
                getFilme();
            }

        } catch (error) {
            Alerta({
                title: "Cadastro de Filme",
                text: "Erro na chamada da API",
                icon: "error",
                confirmButtonText: "OK"
            });
        }



    }

    //receta o formulario e esconde o botão cancelar
    const limparFormulario = () => {
        setValor("");
        setEditar(false)

        setIdEditar(0)
    }




    const preEditar = (item) => {
        //jogar os dados no formulário
        setIdEditar(item.id)
        setValor(item.titulo)
        setEditar(true)
        console.log(item);

    }


    const editarFilme = async (e) => {
        e.preventDefault();
        // alert(`Filme ${valor} | id: ${idEditar}`)

        const objEditar = {
            titulo: valor,
            genero: {
                nome: generoSelecionado
            }
        }

        try {

            const retornoAPI = await api.put(`/Filme/${idEditar}`, objEditar)

            if (retornoAPI.status === 201 || retornoAPI.status === 200) {
                Alerta({
                    title: "Edição de Filme",
                    text: `Filme "${objEditar.titulo}" foi editado com sucesso!!`,
                    icon: "info",
                    confirmButtonText: "OK"
                });
                //limpar o formulário
                limparFormulario();
                //atualizar a lista
                getFilme();
            }
        } catch (error) {
            Alerta({
                title: "Cadastro de Filme",
                text: "Erro na chamada da API",
                icon: "error",
                confirmButtonText: "OK"
            });
        }

    }





    const excluirFilme = async (item) => {
        //validação do formulario   
        const result = await Alerta({
            title: "Exclusão de Filme",
            text: `Tem certeza que deseja excluir o filme "${item.titulo}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        });

        if (!result.isConfirmed) {
            return false;
        }

        try {
            const retornoAPI = await api.delete(`/Filme/${item.id}`)

            if (retornoAPI.status === 204 || retornoAPI.status === 200) {
                Alerta({
                    title: "Exclusão de Filme",
                    text: `Filme (${item.titulo}) foi excluído com sucesso!!`,
                    icon: "success",
                    confirmButtonText: "OK"
                });
            }
            console.log(retornoAPI);
            getFilme();

        } catch (error) {
            Alerta({
                title: "Cadastro de Filme",
                text: "Erro na chamada da API",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    }

    useEffect(() => {
        //chamar os dados da api
        getFilme()
    }, [])

    const getFilme = async () => {
        try {
            const retornoAPI = await api.get("/Filme");
            const dados = retornoAPI.data
            setListaFilmes(dados)
        } catch (error) {
            Alerta({
                title: "Cadastro de Filmes",
                text: "Erro na chamada da API",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    }
    useEffect(() => {
        //chamar os dados da api
        getGeneros()
    }, [])

    const getGeneros = async () => {
        try {
            const retornoAPI = await api.get("/Genero");
            const dados = retornoAPI.data
            setListaGeneros(dados)
        } catch (error) {
            Alerta({
                title: "Cadastro de Gênero",
                text: "Erro na chamada da API",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    }

    return (
        <>
            <Header />

            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Filmes"
                    // visibilidade="none"
                    placeholder="filme"
                    valor={valor}
                    //função que muda o state
                    cancelarEdicao={limparFormulario}
                    setValor={setValor}
                    funcCadastro={editar ? editarFilme : funcCadastro}
                    btnEditar={editar}
                    listaGeneros={listaGeneros}
                    generoSelecionado={generoSelecionado}
                    setGeneroSelecionado={setGeneroSelecionado}
                />

                <Lista
                    tituloLista="Lista de Filmes"
                    // visibilidade="none"
                    //Chama o método para validar:
                    lista={listaFilmes}
                    //Identifica o tipo de lista:
                    tipoLista="filme"
                    funcExcluir={excluirFilme}
                    funcEditar={preEditar}
                />
            </main>

            <Footer />
        </>
    );
}

export default CadastroFilme;