const resolvers = require('./resolvers')
const { makeExecutableSchema } = require('graphql-tools')

const PessoaFisicaAtribs = require('./schemas/atribs_pessoafisica')

const typeDefs = `

    scalar Date

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