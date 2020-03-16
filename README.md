# sqprev
Projeto ainda sem nome definido, criado para fins de estudo da linguagem Java Script no back end.
O objeto de estudo é criar um sistema voltado para a previdência privada, principalmente planos instituídos.
Para ter melhor aplicação prática e para que seja possível testar, será utilizado como exemplo qualquer banco de dados do Stock & Prev
Aplicar os conceitos mais modernos de versionamento GIT, documentar o máximo possível os fontes atravéz dos "commits", tornando estes "commits" uma fonte de conteúdo para posteriormente manter um documento único chamado "Release Notes" em que contenha documentação de todas as alterações do projeto.
Desenvolver usando a metodologia de "parâmetros" em que o sistema em si não possui nenhum dado específico de um cliente e nenhuma configuração específica.
O produto será exatamente o mesmo para todos, e as "especifidades, customizações" precisam ser atendidas todas atravéz de parâmetros diretamente na interface de configuração.
A idéia é que seja possível a implantação de um cliente novo, sem precisar alterar uma única linha de código.
A metodologia inicial seria um repositório central onde contém os fontes da versão estável, e a cada cliente novo seria feito um "git clone" do repositório.
Para isso é fundamental a utilização de variáveis de ambiente "dot env" para cada repositório novo, estas variáveis definem as configurações, senhas de banco de dados, tokens, parâmetros de integração com serviços externos, etc.
Para o versionamento do banco de dados, é indicado usar "migrations" preferencialmente da ferramenta "Knex". isso irá garantir que uma alteração da estrutura do banco de dados será replicado para todas as aplicações de cada cliente conforme feito no repositório central.
As variáveis de ambiente combinado com "migrations" ajudam com a segurança dos dados, já que os desenvolvedores não precisam trabalhar no mesmo banco de dados de produção, nem mesmo saber a senha do banco de dados.
A equipe de testes também terá o seu próprio ambiente de testes, com um banco de dados específico igual ao banco de dados da produção e contendo as últimas features a serem testadas.
A idéia inicial é utilizar o banco PostgreSQL para os dados em geral juntamente com o MongoDB para gardar arquivos base64 de documentos (imagens).
Back end com GraphQL, contendo todas as regras de negócio centralizadas.

Atualizando:
Criadas as tabelas pessoafisica, documentos, tipo_documento usando migrations do Knex.
Adicionado método de gravação de log no banco mongodb, em que irá gravar todos os registros de insert, update, delete que forem feitos no banco postgre. será necessário colocar esta unica linha de código toda vez que for fazer estas operações:
appLog.create({ row: result[0], method: 'insert', table: 'nome_tabela', user: '' });
este atributo "row" é o objeto que irá conter todos os atributos do registro que foi inserido, alterado ou deletado.
