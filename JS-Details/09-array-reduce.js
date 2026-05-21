const produtos = [
{
descricao : 'Camisa polo',
cor : 'Verde',
preco : 49.99,
perfil : 'M',
quantidade : 10,
promocao : false
},
{
descricao : 'Camisa polo',
cor : 'Amarela',
preco : 49.99,
perfil : 'F',
quantidade : 15,
promocao : true
},
{
descricao : 'Camisa polo',
cor : 'Azul',
preco : 49.99,
perfil : 'M',
quantidade : 100,
promocao : true
},
{
descricao : 'Camisa polo',
cor : 'Roxa',
preco : 49.99,
perfil : 'F',
quantidade : 5,
promocao : false
},

];
let totalPreco = 0;
totalEstoque = produtos.reduce((total, produto) => {
    totalPreco += produto.preco * produto.quantidade;
    return total + produto.quantidade;
}, 0);

console.log("A quantidade total de produtos em estoque é de " + totalEstoque);
console.log("O valor total do estoque é de R$ " + totalPreco);


console.clear();
let nome = "Mateus";
let sobrenome = "Latorre";
let idade = 16;

let Barney = {
    nome : nome,
    sobrenome : sobrenome,
    idade : idade
};

console.log(Barney);