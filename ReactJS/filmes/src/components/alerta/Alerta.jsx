import "./Alerta.css";
import Swal from "sweetalert2"; //biblioteca de alertas

export const Alerta = ({
    title,
    text,
    icon,
    showCancelButton = null,
    confirmButtonText = null,
    cancelButtonText = null,
    confirmButtonColor = "#3085d6",
    cancelButtonColor = "#d33"

}) => {
    return Swal.fire({

        title: title,
        text: text,
        icon: icon,
        showCancelButton: showCancelButton != null ? showCancelButton : undefined,
        confirmButtonColor: confirmButtonColor != null ? confirmButtonColor : undefined,
        cancelButtonColor: cancelButtonColor != null ? cancelButtonColor : undefined,
        confirmButtonText,
        cancelButtonText
    });
};



//VERSÃO COM DOIS BOTÕES