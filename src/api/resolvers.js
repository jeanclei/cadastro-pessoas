const dbpostgre = require('../config/postgredb')
const { GraphQLScalarType } = require('graphql')
const dbdocs = require('../schema_docs_mongodb')
const appLog = require('../schema_logs_mongodb')

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
    DateTime: new GraphQLScalarType({
        /*Tipo DateTime criado para retornar a hora completa do banco
        Atualmente está trazendo sem nenhum tratamento, pode ser modificado.*/
        name: 'DateTime',
        description: 'Scalar Type DateTime',
        parseValue(value) {
            return new Date(value) // value from the client
        },
        serialize(value) {
            return new Date(value) // value sent to the client
        },
        parseLiteral(ast) { //caso precisar tratar a data antes de ir para o banco, faça aqui:
            return ast.value
        },
    }),
    ScalarJson: new GraphQLScalarType({
        /*este é o tipo data COM HORA criado para ser usado em toda a API.
        Usei conforme documentação encontrada do graphql,
        não entendi muito bem o 'parseValue', pois ele nunca é chamado
        Serealize é chamado antes de enviar a data para o client 
        parseLiteral é chamado quando o dado é recebido pelo cliente*/
        name: 'ScalarJson',
        description: 'Type ScalarJson',
        parseValue(value) {
            return (value) // value from the client
        },
        serialize(value) {
            return (value) // value sent to the client
        },
        parseLiteral(ast) { //caso precisar tratar a data antes de ir para o banco, faça aqui:
            return ast.value
        },
    }),

    Query: {
        async getPessoaFisica(_, param) {
            return await dbpostgre('pessoafisica').where(param)
        },
        async getDocuments(_, { id_pessoafisica }) {
            return await dbpostgre.select('documentos.*', 'tipo_documento.desc').from('documentos')
                .innerJoin('tipo_documento', 'documentos.id_tipo_documento', 'tipo_documento.id')
                .where({ id_pessoafisica })
        },
        async getTipoDocumento(_, param) {
            return await dbpostgre('tipo_documento').where(param)
        },
        async searchLog(_, { table, id }) {
            let result = await appLog.find({ table, "row.id": id })
            return result

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
            let result = await dbpostgre('pessoafisica').insert({
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
            //grava log no mongodb do regristro criado
            appLog.create({ row: result[0], method: 'insert', table: 'pessoafisica', user: '' })
            return result[0]

        },

        async createDocument(_, { input }) {

            const { _id } = await dbdocs.create({ base64: input.base64img })
            if (_id) {
                let result = await dbpostgre('documentos').insert({
                    id_pessoafisica: input.id_pessoafisica,
                    id_tipo_documento: input.id_tipo_documento,
                    numero: input.numero,
                    dtemiss: input.dtemiss,
                    orgaoemiss: input.orgaoemiss,
                    id_base64: _id.toString()
                }, '*')
                //grava log no mongodb do registro criado
                appLog.create({ row: result[0], method: 'insert', table: 'documentos', user: '' })
            }

            return await dbpostgre.select('documentos.*', 'tipo_documento.desc').from('documentos')
                .innerJoin('tipo_documento', 'documentos.id_tipo_documento', 'tipo_documento.id')
                .where({ id_pessoafisica: input.id_pessoafisica })
        },

        async createTipoDocumento(_, { input }) {
            //cria um tipo_documento e retorna a lista de 
            //todos os tipo_documentos (apenas os habilitados)
            let result = await dbpostgre('tipo_documento').insert({
                desc: input.desc
            }, '*')
            //grava log do registro criado
            appLog.create({ row: result[0], method: 'insert', table: 'tipo_documento', user: '' })
            return await dbpostgre('tipo_documento').where({ enable: true })
        },
        async updateTipoDocumento(_, { input }) {
            //Altera o campo enable e retorna a lista de 
            //todos os tipo_documentos (apenas os habilitados)
            let result = await dbpostgre('tipo_documento').update({
                enable: input.enable
            }, '*').where({ id: input.id })
            //grava log do update
            appLog.create({ row: result[0], method: 'update', table: 'tipo_documento', user: '' })

            return await dbpostgre('tipo_documento').where({ enable: true })
        },
        async deleteTipoDocumento(_, { input }) {
            let result = await dbpostgre('tipo_documento')
                .delete('*').where({ id: input.id })
            //grava log do delete
            appLog.create({ row: result[0], method: 'delete', table: 'tipo_documento', user: '' })

            return await dbpostgre('tipo_documento').where({ enable: true })
        }

    }

}