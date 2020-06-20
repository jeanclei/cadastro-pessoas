#Cadastro de Pessoas (Back End).
- A idéia do projeto é servir como um "modelo inicial" para outros projetos, visto que pode ser aplicado em muitas situações um cadastro de pessoas, e documentos, etc.
- Outro foco importante do projeto foi tornar possível uma geração de logs de todas as operações do banco, como alterações, inserções e deleções de uma forma simples e organizada, que não comprometesse o desempenho do banco de dados principal.
- Como banco de dados principal, foi utilizado o Postgree, que na verdade pode ser substituido por qualquer outro que seja compatível com Knex.js.
- Para gravação de logs e armazenamento de imagens em base64 foi utilizado o banco Mongodb. Ao evoluir o projeto, procure utilizar os métodos insertDB, updateDB, deleteDB, pois estes métodos criam o log automaticamente de todas as operações. Estes métodos recebem o nome da tabela, e o objeto a ser gravado e fazem o resto do trabalho. para alterações e deleções o objeto precisa conter o id, para inclusão, o banco irá gerar o id e devolver o objeto gravado no postgre em formato json, passando para o GraphQL.
- Todas as tabelas criadas precisam que o campo chave primária seja com o nome (id), do tipo serial, para que estes métodos funcionem. Caso contrário, precisará implementar o log de forma isolada.
- A tabela de documentos grava apenas os dados dos documentos, enquanto a imagem do documento fica no mongodb contendo o id do documento. podem ser cadastradas n imagens para um documento (ex frente e verso).

Importante: Para iniciar o projeto, instalar todas as dependências normalmente com npm install, configurar o arquivo .env conforme o arquivo de exemplo, crie um banco mongodb e um postgree para isso, pode usar até esse banco do mongodb Atlas que está no exemplo, mas aconselho criar o seu, é gratis!
Rodar knex migrate:latest para criar as tabelas no postgree. Para criar novas tabelas, use knex migrate:make (consulte documentação do knex).
Contribua se possível ;)
