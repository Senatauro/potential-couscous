========
AppSync
========
Para realizar operações especificas e pesquisas/mudanças no banco de dados está sendo utilizado a API GraphQL que atua como serviço intermediario entre a aplicação e os serviços criados no backend.

Tipos de Operações
--------

Para este projeto iremos utilizar 2 tipos de operações:

- Query
- Mutation


.. _Query:

***********************
Query
***********************

Queries são operações que realizam buscas no banco de dados, retornando resultados encontrados dado os parâmetros enviados.

Queries podem ser categorizadas em 3 tipos padrões:

- Get: Retorna 1 elemento dado um parâmetro(Geralmente ID) enviado
- List: Retorna uma lista, que pode ser paginada, com todos os elementos
- Sync: Sincroniza dados armazenados offline com dados online


.. _Mutation:

***********************
Mutation
***********************

Mutation são operações que realizam funções únicas ou mudanças no banco de dados, adicionando, removendo ou alterando informações dado os parâmetros enviados.

Mutation podem ser categorizadas em 3 tipos padrões:

- Create: Cria um elemento no banco de dados com os dados enviados
- Update: Atualiza um elemento já existente no banco de dados dado um parâmetro(Geralmente ID) e dados enviados
- Delete: Deleta um elemento existente no banco de dados dado um parâmetro(Geralmente ID)