const resolvers = require('./resolvers')
const { makeExecutableSchema } = require('graphql-tools')

const PessoaFisicaAtribs = `
id: ID
nome: String!
cpf: String!
dtnasc: String
sexo: String!
nomepai: String
nomemae: String!
nomeconjuge: String
naturalidade: String
email: String!
email2: String
fundador: Boolean
`

const typeDefs = `
    type PessoaFisica {
        ${PessoaFisicaAtribs}
    }

    type Query {
        getPessoaFisica(id: ID!): PessoaFisica
        getPessoasFisicas: [PessoaFisica]
    }

    input PessoaFisicaInput {
        ${PessoaFisicaAtribs}
    }

    type Mutation {
        createPessoaFisica(input: PessoaFisicaInput): PessoaFisica
    }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })