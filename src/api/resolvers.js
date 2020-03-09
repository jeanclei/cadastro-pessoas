const dbpostgre = require('../config/pgdatabase')
const { GraphQLScalarType } = require('graphql')

function formatDate(value) {
    return new Date(value).toLocaleDateString(this._locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })
}

module.exports = {

    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type (31/12/1990 1990-12-31)',
        parseValue(value) {
            return formatDate(value) // value from the client
        },
        serialize(value) {
            return formatDate(value) // value sent to the client
        },
        parseLiteral(ast) { //caso precisar tratar a data antes de ir para o banco, faça aqui:
            return ast.value
        },
    }),

    Query: {
        async getPessoaFisica(_, { id }) {
            return await dbpostgre('pessoafisica').where({ id }).first()
        },
        async getPessoasFisicas() {
            return await dbpostgre('pessoafisica')
        }
    },
    Mutation: {
        async createPessoaFisica(_, { input }) {
            const result = await dbpostgre('pessoafisica').insert({
                nome: input.nome,
                cpf: input.cpf,
                dtnasc: input.dtnasc,
                sexo: input.sexo,
                nomepai: input.nomepai,
                nomemae: input.nomemae,
                nomeconjuge: input.nomeconjuge,
                naturalidade: input.naturalidade,
                email: input.email,
                email2: input.email2,
                fundador: input.fundador
            }, '*')

            return result[0]

        }
    }

}