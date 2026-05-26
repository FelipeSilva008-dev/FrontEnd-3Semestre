import "./CadastroGenero.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro"
import { useEffect, useState } from "react";
import api from "../../services/services";
import Lista from "../../components/lista/Lista"
import Swal from "sweetalert2"; //biblioteca de alertas

import { Alerta } from "../../components/alerta/Alerta";

const CadastroGenero = () => {

    //states e variáveis
    const [valor, setValor] = useState("")
    const [idEditar, setIdEditar] = useState(0)
    const [editar, setEditar] = useState(false)
    const [listaGeneros, setListaGeneros] = useState([])

    //ciclo de vida e funções 

    //POST
    const funcCadastro = async (e) => {
        e.preventDefault();
        //validação dos dados preenchidos
        if (valor.trim().length == 0) {
            Alerta({
                title: "Cadastro de Gênero",
                text: "Gênero deve ser preenchido antes de cadastrar.",
                icon: "warning",
                confirmButtonText: "OK"
            });
            return false
        }

        const objCadastro = {
            nome: valor
        }

        try {
            //cadastra na api, no endpoint do swageer
            const retornoAPI = await api.post("/Genero", objCadastro)
            if (retornoAPI.status == 201 || retornoAPI.status === 200) {
                Alerta({
                    title: "Cadastro de Gênero",
                    text: `Gênero (${objCadastro.nome}) foi cadastrado com sucesso!!`,
                    icon: "success",
                    confirmButtonText: "OK"
                });

                //limpar os campos 
                limparFormulario();

                //chamar o getGeneros
                getGeneros();
            }

        } catch (error) {
            Alerta({
                title: "Cadastro de Gênero",
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
        setValor(item.nome)
        setEditar(true)
        console.log(item);

    }


    const editarGenero = async (e) => {
        e.preventDefault();
        // alert(`Gênero ${valor} | id: ${idEditar}`)

        const objEditar = {
            nome: valor
        }

        try {

            const retornoAPI = await api.put(`/Genero/${idEditar}`, objEditar)

            if (retornoAPI.status === 201 || retornoAPI.status === 200) {
                Alerta({
                    title: "Edição de Gênero",
                    text: `Gênero (${objEditar.nome}) foi editado com sucesso!!`,
                    icon: "info",
                    confirmButtonText: "OK"
                });
                //limpar o formulário
                limparFormulario();
                //atualizar a lista
                getGeneros();
            }
        } catch (error) {
            Alerta({
                title: "Cadastro de Gênero",
                text: "Erro na chamada da API",
                icon: "error",
                confirmButtonText: "OK"
            });
        }

    }





    const excluirGenero = async (item) => {
        //validação do formulario   
        const result = await Alerta({
            title: "Exclusão de Gênero",
            text: `Tem certeza que deseja excluir o gênero (${item.nome})?`,
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
            const retornoAPI = await api.delete(`/Genero/${item.id}`)

            if (retornoAPI.status === 204 || retornoAPI.status === 200) {
                Alerta({
                    title: "Exclusão de Gênero",
                    text: `Gênero (${item.nome}) foi excluído com sucesso!!`,
                    icon: "success",
                    confirmButtonText: "OK"
                });
            }
            console.log(retornoAPI);
            getGeneros();

        } catch (error) {
            Alerta({
                title: "Cadastro de Gênero",
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

    //o jsx
    return (
        <>
            <Header />

            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Gêneros"
                    visibilidade="none"
                    placeholder="gênero"
                    valor={valor}
                    //função que muda o state
                    cancelarEdicao={limparFormulario}
                    setValor={setValor}
                    funcCadastro={editar ? editarGenero : funcCadastro}
                    btnEditar={editar}
                />

                <Lista

                    tituloLista="Lista de Gêneros"
                    visibilidade="none"
                    //Chama o método para validar:
                    lista={listaGeneros}
                    //Identifica o tipo de lista:
                    tipoLista="genero"
                    funcExcluir={excluirGenero}
                    funcEditar={preEditar}
                />
            </main>

            <Footer />
        </>
    );
}

export default CadastroGenero;