async function calcular(){
    let nome = document.getElementById("nome").value;
    let altura = parseFloat(document.getElementById("altura").value);
    let peso = parseFloat(document.getElementById("peso").value);
    let imc = peso/(altura * altura);
    let situacao = gerarSituacao(imc);
    if(
       nome.trim().length == 0 || 
       isNaN(altura) || 
       isNaN(peso)
    ){
        alert("Preencher todos os campos");
        return false;
    }

    const objIMC = {
        nome: nome,
        altura: altura,
        peso: peso,
        imc: imc.toFixed(2),
        situacao: situacao
    }
    const dadosGravados = await cadastrarNaAPI(objIMC);
    console.log(dadosGravados);
    if("error" in dadosGravados){
      alert(dadosGravados.error);  
    }else{
        carregarCadastros();
    }
}
 function mostrarNaTela(objCadastro){
    document.getElementById("cadastro").innerHTML += 
    `
    <tr>
    <td>${objCadastro.nome}</td>
    <td>${objCadastro.altura}</td>
    <td>${objCadastro.peso}</td>
    <td>${objCadastro.imc}</td>
    <td>${objCadastro.situacao}</td>
    </tr>
    `
 }
async function cadastrarNaAPI(objCadastro){
    try {
        const retorno = await fetch("http://localhost:3000/imc",
        {
            method: "POST",
            body: JSON.stringify(objCadastro),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }
        );
        const dadosSalvos = await    retorno.json();
        return dadosSalvos;
    } catch (error) {
        console.log(error);
        return await{
            error: "Não foi possível salvar os dados"
        }
    }
}
function gerarSituacao(imc){
    if (imc < 16){
     return "Magreza grave";
    }else if(imc >= 16 && imc < 17){
     return"Magreza moderada";
    }else if(imc >= 17 && imc < 18.5){
        return "Magreza leve";
    }else if(imc >= 18.5 && imc < 25){
        return "Saudável";
    }else if(imc >= 25 && imc < 30){
        return "Sobrepeso";
    }else if(imc >= 30 && imc < 35){
        return "Obesidade grau I";
    }else if(imc >= 35 && imc < 40){
        return "Obesidade grau II";
    }else{
        return "Obesidade grau III";
    }
}
async function carregarCadastros(nomeClasse = "cadastrado"){
const retorno = await fetch("http://localhost:3000/imc");
let dadosCadastros = await retorno.json();
console.log(dadosCadastros);

dadosCadastros.sort((a, b) => a.nome.localeCompare(b.nome));

document.getElementById("cadastro").innerHTML = "";
await dadosCadastros.forEach(pessoa => {
    mostrarNaTela(pessoa)});
}
 