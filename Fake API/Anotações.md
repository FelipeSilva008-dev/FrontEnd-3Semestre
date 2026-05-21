# JSON SERVER

- Facilitar o desenvolvimento Front-End, para você não ter que aguardar o programador Back-End desenvolver a API.
- Cria uma API falsa (API Rest).
- db.json

## Como Instalar

Abrir o Terminal (pode ser do VScode ou não) e rodar o seguinte comando: 

`npm install -g json-server`

(com a flag/parâmetro) -g, você instala o json-server de forma global para qualquer projeto que você precisar usar depois.

Criar o arquivo db.json na raiz do seu projeto (No VScode) - Este arquivo serve como banco de dados do json-server e ele mesmo controla esse arquivo a cada requisição

## Exemplo de Estrutura:

```jsx
{
	"Rota/EndPoint" :[
	 {"id" : 1, "dado-qualquer" : "valor qualquer"},
	 {"id" : 2, "dado-qualquer" : "valor qualquer"},
	 {"id" : 3, "dado-qualquer" : "valor qualquer"}
	]
}
```

## Exemplo Fictício:

```jsx
{
	"usuário" :[
	{"id" : 1, "nome" : "Mateus Latorre", "email" : "mateus@gmail.com", "idade" : 16}
	{"id" : 2, "nome" : "José Silva", "email" : "jose@gmail.com", "idade" : 98}
  ]
}
```

No VScode devemos abrir o terminal e alterar para o terminal do git bash (testar o do Windows?)

Rodar o comando: `npx json-server --watch db.json`