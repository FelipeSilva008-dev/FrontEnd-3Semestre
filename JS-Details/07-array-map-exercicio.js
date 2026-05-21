const numeros = [
    50,
    200,
    250,
    800,
    992.87,
    800,
    500,
    9876,
    99,
    134
];

const novosNumeros = numeros.map((num) => {
    return num * 2;
});
let textoResultado = "";
novosNumeros.forEach((num) => {
    textoResultado += `${num} | `;
});
console.log(textoResultado);

textoResultado = textoResultado.substring(0, textoResultado.length - 2);
console.log(textoResultado);