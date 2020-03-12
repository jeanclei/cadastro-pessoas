const dbpostgre = require('../config/postgredb')
const { GraphQLScalarType } = require('graphql')
const dbdocs = require('../schema_mongodb')

function formatDate(value) {
    return new Date(value).toLocaleDateString(this._locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })
}

module.exports = {

    Date: new GraphQLScalarType({
        /*este é o tipo data criado para ser usado em toda a API.
        Usei conforme documentação encontrada do graphql,
        não entendi muito bem o 'parseValue', pois ele nunca é chamado
        Serealize é chamado antes de enviar a data para o client 
        parseLiteral é chamado quando o dado é recebido pelo cliente*/
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
        async getPessoaFisica(_,  parms) {
            return await dbpostgre('pessoafisica').where(parms)
        },
        async getDocuments(_, { id_pessoafisica }) {
            return await dbpostgre.select('documentos.*', 'tipo_documento.desc').from('documentos')
                .innerJoin('tipo_documento', 'documentos.id_tipo_documento', 'tipo_documento.id')
                .where({ id_pessoafisica })
        }
    },

    PessoaFisica: {
        Document: async function (obj, args) {
            return await dbpostgre('documentos').where({ id_pessoafisica: obj.id })
        }
    },

    Document: {
        foto_documento: async function (obj, args) {
            return await dbdocs.findById(obj.id_base64)
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

        },

        async createDocument(_, { input }) {

            const { _id } = await dbdocs.create({ base64: input.base64img })
            if (_id) {
                await dbpostgre('documentos').insert({
                    id_pessoafisica: input.id_pessoafisica,
                    id_tipo_documento: input.id_tipo_documento,
                    numero: input.numero,
                    dtemiss: input.dtemiss,
                    orgaoemiss: input.orgaoemiss,
                    id_base64: _id.toString()
                })
            }

            return await dbpostgre('documentos').where({ id_pessoafisica: input.id_pessoafisica })

        }

    }

}