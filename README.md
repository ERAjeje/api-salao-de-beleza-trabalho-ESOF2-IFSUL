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

Existe uma rota padrão para verificar se está tudo funcionando e conectado. Utilize o "/v1/" para acessar uma rota do tipo GET que exibirá uma mensagem no navegador caso esteja tudo correto.

Para realização de cadastro de um novo usuário (Signup) utilize a rota "/v1/signup". Esta rota é do tipo POST e será necessário informar via body da requisição um json seguindo o modelo
```
{
    "name": "Fulano de Tal",
    "email": "fulano@email.com",
    "password": "123456"
}
```
Esses são campos obrigatórios no banco e na falta de um ou mais desses campos, a requisição retornará um status 500 e um erro informando os campos obrigatórios que não foram preenchidos.