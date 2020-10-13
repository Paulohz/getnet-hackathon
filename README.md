# ✔ Indice 

- [Sobre](#-sobre)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Como Baixar o Projeto](#-como-baixar-o-projeto)

---

## 📜 Sobre 

O projeto do **Digitalizze** foi desenvolvido durante o **Hackathon da GetNet**. A **Digitalizze** é uma plataforma de busca e venda de produtos e serviços com a missão de unir o cliente ao Microempreendedor, fazendo com que o  Microempreendedor consiga ter uma presença digital dando uma maior visibilidade e deixando o seu cliente informado sobre seus produtos/serviços possibilitando uma maior rede de clientes.

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as as seguintes tecnologias.

- ReactJS
- NodeJS

---

## 📦 Como Baixar o Projeto

```bash
$ git clone https://github.com/Paulohz/getnet-hackathon

# Entrar no diretório do backend
$ cd backend

# É necessário criar um arquivo .env na raiz do backend. 

# Siga o formato do arquivo .env.example

# API_CLIENT_ID é a concatenação de "ClientID:ClientSecret" convertidos para base64.

# Client Id e client secret são obtidos através do cadastro no Sandbox da GetNet

#Em SECRET colocar qualquer valor que servirá de segredo para o JWT

# Instalar as dependências
$ yarn 

# Iniciar o servidor
$ yarn dev:server

# (Opcional) Caso queira você pode deletar o banco de dados em backend\src\database\database.sqlite

# (Opcional) Iniciar o banco novamente sem dados 
$ yarn knex:migrate

# Voltar um diretório
$ cd ../

# Entrar no diretório do frontend
$ cd frontend

# É necessário criar um arquivo .env na raiz do frontend. 

# Siga o formato do arquivo .env.example

# Preencha REACT_APP_API_KEY com a sua key da API do Google Maps 

# Instalar as dependências
$ yarn 

# Iniciar o projeto 
$ yarn start

```








