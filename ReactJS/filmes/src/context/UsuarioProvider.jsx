
import {  useEffect, useState } from "react";
import { UsuarioContext } from "./UsuarioContext";

// disponibiliza o state do usuário de forma global para
// todos os seus componenetes filhos ( children )
export const UsuarioProvider = ({children}) => {
    const [email, setEmail] = useState(null)

    // ciclo de vida
    useEffect(()=>{
        const emailLogado = JSON.parse(localStorage.getItem("usuario"))
        setEmail(emailLogado) 
    } ,[])

    return(
        <UsuarioContext.Provider
           value={{
            email,
            setEmail
           }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}