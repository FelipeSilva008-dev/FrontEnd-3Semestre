import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UsuarioContext } from "../context/UsuarioContext";
// import { ProdutoContext } from "../context/ProdutoContext";

//componente de rotas privadas
const PrivateRoute = ({children}) => {
    //recupera o state global do usuario (Vem do UsuarioProvider)
    const {email} = useContext(UsuarioContext);
    // const {listaProduto} = useContext(ProdutoContext);

    //logado? renderiza o componente privado
    //nao logado? redireciona para a home
    return email ? children : <Navigate to="/" />
    
}

export default PrivateRoute;