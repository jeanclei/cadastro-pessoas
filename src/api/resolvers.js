const dbpostgre = require('../config/pgdatabase')
module.exports = {
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