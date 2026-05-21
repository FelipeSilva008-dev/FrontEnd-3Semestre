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

// produtosFemininos = produtos.filter((produto) => {
//     return produto.perfil == 'F';
// });

// console.log(produtosFemininos);
const produtosPromocao = produtos.filter((produto) => {
    return produto.promocao == true;
});

let qtdPromocao = 0;

produtosPromocao.forEach((p) => {
    qtdPromocao += p.quantidade;
});

console.log("A quantidade de produtos em promomção é de " + qtdPromocao);
console.log(produtosPromocao);