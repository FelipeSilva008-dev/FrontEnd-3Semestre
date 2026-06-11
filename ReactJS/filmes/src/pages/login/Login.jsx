import Logo from "../../assets/img/logo.svg";
import "./Login.css";
import Botao from "../../components/botao/Botao.jsx";
import Header from "../../components/header/Header.jsx";
import { UsuarioContext } from "../../context/UsuarioContext.jsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alerta } from "../../components/alerta/Alerta.jsx";

const Login = () => {

    const { email, setEmail } = useState("")
    // const { senha, setSenha } = useState("")
    const navigate = useNavigate();

    // states e variáveis
    const [novoEmail, setNovoEmail] = useState("")

    // ciclo de vida e funções
    //guarda o usuário no localStorage no formato JSON
    const funclogin = /*async*/ () => {
        // if (email.trim().length == 0 || senha.trim().length == 0) {
        //     Alerta({
        //         title: "Cadastro de Filme",
        //         text: "Preencha todos os campos para cadastrar.",
        //         icon: "warning",
        //         confirmButtonText: "OK"
        //     });
        //     return false
        // }

        // const dadosLogin = {
        //     email: novoEmail,
        //     senha: senha
        // }

        // try {
        //     const retornoAPI = await api.post("/Login", dadosLogin)
        //     const token = await retornoAPI.data.token; //token que retorna api
        //     const usuarioDecoded = jwt_decode(token);
        //     setEmail(usuarioDecoded)

        //     localStorage.setItem("email", JSON.stringify(usuarioDecoded))
        //     setEmail("")
        //     setSenha("")
        // } catch (error) {
        //     Alerta({
        //         title: "Erro no Login",
        //         text: "Usuário não encontrado.",
        //         icon: "error",
        //         confirmButtonText: "OK"
        //     });
        // }


    const verificaLogin  = () => {
        const logado = JSON.parse(localStorage.getItem("email"))

        if(logado != undefined || logado != null) { //se estiver logado
            setEmail(logado) // atuailza o state global do usuário (UsuarioContext e Provider)
            navigate("/filmes") // redireciona para a página de filmes
        }
    }
    useEffect(() => {
        verificaLogin()
    }, [])

        // pega o dado e coloca no storage
        localStorage.setItem("email", JSON.stringify(novoEmail))
        setEmail(novoEmail)

        navigate("/filmes") // redireciona para a página de filmes

        setNovoEmail("") // limpa os dados do formulário


    }

    return (
        <>
            <Header />
            <main className="main_login">
                <div className="banner"></div>
                <section className="section_login">
                    <img src={Logo} alt="Logo do Filmoteca" />
                    <form action=""
                        className="form_login"
                        onSubmit={(e) => {
                            e.preventDefault()
                            funclogin()
                        }}>
                        <h1>Login</h1>
                        <div className="campos_login">
                            <div className="campo_input">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Digite seu e-mail"
                                    value={novoEmail}
                                    onChange={(e) => {
                                        setNovoEmail(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="campo_input">
                                <label htmlFor="senha">Senha:</label>
                                <input type="password" name="senha" placeholder="Digite sua senha" />
                            </div>
                        </div>
                        <Botao
                            onClick={() =>
                                console.log("função executada")}
                            nomeDoBotao="Entrar"
                        >
                        </Botao>

                        {/* <Botao
                            btnLogin={true}
                            fnLogin={funclogin}
                            nomeDoBotao="Entrar"
                        > 
                        </Botao> */}
                    </form>
                </section>
            </main>
        </>
    )
}

export default Login;