# API Salão de Beleza - Trabalho de Engenharia de Software 2 IFSUL de Minas Campus Passos

Esta api realiza a conexão com o banco de dados MongoDB Atlas e gerenciamento de rotas utilizando Node Express e segurança de autenticação JWT utilizando Jsonwebtoken.

## Tecnologias Utilizadas

- Node.js
- Express
- Javascript Moderno (ESLint)
- Mongoose
- DotEnv
- Cors

## Utilização

Realizar o clone através do comando
```
git clone https://github.com/ERAjeje/api-salao-de-beleza-trabalho-ESOF2-IFSUL.git
```
Após o clone do repositório é necessário instalar as dependencias do projeto através do comando
```
cd api-salao-de-beleza-trabalho-ESOF2-IFSUL
npm install
```
Uma vez instaladas as dependências, é necessária a criação de uma conta no MongoDB Atlas ou uma instancia local do MongoDB e criação de um arquivo .env utilzando como exemplo o .sampleEnv. Nesse arquivo estão a SECRET que será utilizada pelo JWT na criptografia e verificação do token, a PORT para utilização do banco e a string de conexão MONGODB_URL para conexão com o banco mongodb, seja em uma instancia local ou no MongoDB Atlas.

Depois de realizadas as configurações iniciais, é possivel rodar a API utilizando o comando
```
npm run dev
```
Ele inicializará uma instancia do nodemon para hot reload sempre que houver uma alteração salva no código.

## Rotas

Existe uma rota padrão para verificar se está tudo funcionando e conectado. Utilize o "*/v1/*" para acessar uma rota do tipo GET que exibirá uma mensagem no navegador caso esteja tudo correto.

Para realização de cadastro de um novo usuário (Signup) utilize a rota "*/v1/signup*". Esta rota é do tipo POST e será necessário informar via body da requisição um json seguindo o modelo
```
{
    "name": "Fulano de Tal",
    "email": "fulano@email.com",
    "password": "123456"
}
```
Esses são campos obrigatórios no banco e na falta de um ou mais desses campos, a requisição retornará um status 500 e um erro informando os campos obrigatórios que não foram preenchidos.

Para realização de login no sistema utiliza-se a rota "*/v1/login*". Nela as informações de login (user e password) são informados através do headers authorization como Basic Auth e utiliza-se uma rota do tipo GET. Essa forma de trafego de dados para login é mais segura que a forma mais usual, utilizando rota POST e informações no body.
Essa rota retornará ao solicitante um documento json com os dados do usuário logado e um token de autorização de sessão. Esse token tem um tempo de vida de 86400 segundos e após expirado a sessão do usuário será cancelada. Essa resposta segue o modelo
```
{
    "user": {
    "_id": "5faca9dd5cbb4c0dx470f831",
    "name": "Fulano de Tal",
    "email": "fulano@email.com",
    "createdAt": "2020-11-12T03:19:57.038Z",
    "updatedAt": "2020-11-12T03:19:57.038Z",
    "id": "5faca9dd5cbb4c0dx470f831"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWZhY2E5ZGQ1Y2JiNGMwZGQ0NzBmODMxIiwiaWF0IjoxNjA1MTUzMDE4LCJleHAiOjE2MDUyMzx0MTh9.y1ppeUQ99_VrtYdkcrXyUxbDYFwTgui0jfs0_5zHsRY"
}
```
Para acesso de uma rota autenticada (rota que necessita de login para acesso) é necessário informar o token recebido no momento do login. Esse token deve ser informado através do headers authorization como um Bearer token. Caso esse token não seja informado ou não seja válido, a rota autenticada retornará um status 400.

A rota "*/v1/me*" retorna o usuário logado através da validação do token que será informado no headers authorization. O modelo de resposta é
```
{
    "_id": "5faca9dd5cbb4c0dx470f831",
    "name": "Fulano de Tal",
    "email": "fulano@email.com",
    "createdAt": "2020-11-12T03:19:57.038Z",
    "updatedAt": "2020-11-12T03:19:57.038Z",
    "id": "5faca9dd5cbb4c0dx470f831"
}
```