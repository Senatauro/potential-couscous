============
Instalação para o front-end
============ 

Para utilizar as funções que essa documentação aborda no front-end é necessária a instalação de alguns pacotes.

Instalar o pacote na pasta do projeto::

    $ npm install aws-amplify


=========
Instalação para o back-end
=========

Para a inicialização e gerenciamento do banco de dados é necessário a instalação da ferramenta CLI do Amplify

Instalar a ferramenta CLI do Amplify::

    $ npm install -g @aws-amplify/cli


Com a ferramenta amplify instalado, é necessário seguir o passo a passo de configuração de conta e inicialização de um projeto como explicado em::

- https://docs.amplify.aws/cli/start/install#option-2-follow-the-instructions
- https://docs.amplify.aws/cli/start/workflows#amplify-init

Com a inicialização do projeto concluida, é necessário adicionar alguns componentes:

- amplify add api (utilizar a opção de graphql)
- amplify add auth (utilizar a opção padrão)
- amplify add function (adicionar uma função com o nome de valorUnicoCliente)
- amplify add function (adicionar uma função com o nome de valorUnicoFuncionario)
- amplify add function (adicionar uma função com o nome de valorUnicoRestaurante)
- amplify add function (adicionar uma função com o nome de valorUnicoUsuario)
- amplify push


Feito estes comandos, é necessário copiar as pastas src de cada função existente na pasta de arquivos e sobreescrever as funções correspondentes criadas pelo Amplify.

Feito a copia dos src's, existe um arquivo neste formato::

    nomeDaFunção-cloudformation-template.json

Este arquivo determina as configurações e autorizações que tal função possui no backend.
Dentro de cada um destes arquivos será necessário adicionar uma regra na seção Statement dentro de::

    lambdaexecutionpolicy->Properties->PolicyDocument->Statement

É necessária adicionar a regra de permissão para a função poder acessar a tabela dentro Dynamodb. Você deve adicionar o seguinte:


{
    "Effect": "Allow",
    "Action": [
      "dynamodb:PutItem",
      "dynamodb:Scan"
    ],
    "Resource": "ARN DA TABELA REFERIDA NA FUNCAO"
}

O ARN da tabela você pode pegar na seção do DynamoDB, selecionando a tabela que a função acessa.