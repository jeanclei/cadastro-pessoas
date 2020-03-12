const resolvers = require('./resolvers')
const { makeExecutableSchema } = require('graphql-tools')

const PessoaFisicaSchema = require('./schemas/pessoafisica_schema')
const DocumentsSchema = require('./schemas/documents_schema')

const typeDefs = `

    scalar Date

    ${PessoaFisicaSchema}

    ${DocumentsSchema}

    type Query {

        getPessoaFisica(id: ID, cpf: String, nome: String): [PessoaFisica]

        getDocuments(id_pessoafisica: ID!): [Document]
    }    
    
    type Mutation {

        createPessoaFisica(input: PessoaFisicaInput): PessoaFisica

        createDocument(input: DocumentInput): [Document]
    }

`

module.exports = makeExecutableSchema({ typeDefs, resolvers })