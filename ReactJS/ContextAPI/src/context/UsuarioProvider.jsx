
import {  useState } from "react";
import { UsuarioContext } from "./UsuarioContext";

//disponibiliza o state do usuário de forma global para
//todos os seus componenetes filhos ( children )
export const UsuarioProvider = ({children}) => {
    const [usuario, setUsuario] = useState()
    return(
        <UsuarioContext.Provider
           value={{
            usuario,
            setUsuario
           }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}