import Logo from "../../assets/img/logo.svg";
import "./Login.css";
import Botao from "../../components/botao/Botao.jsx";
import { UsuarioContext } from "../../context/UsuarioContext.jsx";
import { useContext } from "react";

const Login = () => {

    const { email, setEmail } = useContext(UsuarioContext)

    // states e variáveis
    const [novoEmail, setNovoEmail] = useState("")

    // ciclo de vida e funções
    //guarda o usuário no localStorage no formato JSON
    const funclogin = () => {
        // pega o dado e coloca no storage
        localStorage.setItem("email", JSON.stringify(novoEmail))
        setEmail(novoEmail)
        setNovoEmail("") // limpa os dados do formulário
    }

    return (
        <main className="main_login">
            <div className="banner"></div>
            <section className="section_login">
                <img src={Logo} alt="Logo do Filmoteca" />
                <form action="" className="form_login">
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
                    <Butao
                        nomeDoBotao="Entrar"
                        onClick={() =>
                            funclogin()
                        }
                    />
                </form>
            </section>
        </main>
    )
}

export default Login;