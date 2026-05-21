import "./CadastroGenero.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro"
import { useEffect, useState } from "react";
import api from "../../services/services";
import Lista from "../../components/lista/Lista"

const CadastroGenero = () => {

    //states e variáveis
    const [valor, setValor] = useState("")

    const [listaGeneros, setListaGeneros] = useState([])

    //ciclo de vida e funções 

    //POST
    const funcCadastro = async (e) => {
        e.preventDefault();
        //validação dos dados preenchidos
        if (valor.trim().length == 0) {
            alert("Gênero deve ser preenchido antes de cadastrar")
            return false
        }

        const objCadastro = {
            nome: valor
        }

        try {
            //cadastra na api, no endpoint do swageer
            const retornoAPI = await api.post("/Genero", objCadastro)
            if (retornoAPI.status == 201 || retornoAPI.status === 200) {
                alert("Gênero cadastrado com sucesso!!")

                //limpar os campos 
                limparFormulario();

                //chamar o getGeneros
            }
            else {
                alert("Houve algum problema ao cadastrar.")
            }

        } catch (error) {
            alert("Erro na chamada da API")
            console.log(error)
        }



    }
    const limparFormulario = () => {
        setValor("");
    }

    const editarGenero = () => {
        alert("Função editar Gênero em desenvolvimento")
    }

    const excluirGenero = async (item) => {
        console.log(item)

        try {
            const retornoAPI = await api.delete(`/Genero/${item.id}`)
            if (retornoAPI.status == 201 || retornoAPI.status === 200) {
                alert("Gênero excluido com sucesso!!")
            }
            console.log(retornoAPI);
            
        } catch (error) {
            
        }
    }

    useEffect(() => {
        //chamar os dados da api
        getGeneros()
    }, [])

    const getGeneros = async () => {
        try {
            const retornoAPI = await api.get("/Genero")
            const dados = retornoAPI.data
            setListaGeneros(dados)
        } catch (error) {
            alert("Erro ao retornar os dados")
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
                    setValor={setValor}
                    funcCadastro={funcCadastro}
                    editar={editar}
                    setEditar={setEditar}
                />

                <Lista

                    tituloLista="Lista de Gêneros"
                    visibilidade="none"
                    //Chama o método para validar:
                    lista={listaGeneros}
                    //Identifica o tipo de lista:
                    tipoLista="genero"
                funcExcluir={excluirGenero}
                funcEditar={editarGenero}
                />
            </main>

            <Footer />
        </>
    );
}

export default CadastroGenero;