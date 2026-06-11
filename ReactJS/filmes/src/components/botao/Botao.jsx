import "./Botao.css"

const Botao = (props) => {
    return (

        <button className="botao"
            type={props.btnEditar ? "button" : "submit"}
            onClick={ () => {
                if(props.btnEditar) {
                    console.log("função de editar executada")
                    props.cancelarEdicao()
                } else if(props.onClick) {
                    props.onClick()
                }
            }}
        >{props.nomeDoBotao}</button>

    )
}

export default Botao;