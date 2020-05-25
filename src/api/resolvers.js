const dbpostgre = require('../../config/postgredb')
const { GraphQLScalarType } = require('graphql')
const dbdocs = require('../schema_docs_mongodb')
const appLog = require('../schema_logs_mongodb')
const methods = require('./methods')

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
                .where({ id_pessoafisica }).andWhere({ deleted: false })
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
            return await dbdocs.find({ "idDocumento": obj.id })
        },
        desc: async function (obj, args) {
            let { desc } = await dbpostgre('tipo_documento').select('desc')
                .where({ id: obj.id_tipo_documento }).first()
            return desc
        }
    },

    Mutation: {
        createPessoaFisica(_, { input }) {
            return methods.insertDB(input, 'pessoafisica')
        },

        updatePessoaFisica(_, { id, atribs }) {
            return methods.updateDB(id, atribs, 'pessoafisica')
        },

        createDocument(_, { input }) {
            return methods.insertDB(input, 'documentos')
        },

        createFotoDocumento(_, input) {
            return methods.insertFotoDocumento(input)
        },

        async updateDocument(_, { input }) {
            //pode alterar dados do documento, mas nao pode alterar a imagem
            //precisando alterar a imagem, tera que marcar como deletada e inserir outro documento            
            let { id_pessoafisica } = await methods.updateDB(input, 'documentos')
            //retorna todos os documentos da pessoa depois de fazer a alteração
            return await dbpostgre.select('documentos.*', 'tipo_documento.desc').from('documentos')
                .innerJoin('tipo_documento', 'documentos.id_tipo_documento', 'tipo_documento.id')
                .where({ id_pessoafisica }).andWhere({ deleted: false })
        },

        async createTipoDocumento(_, input) {
            //cria um tipo_documento mas retorna todos os tipo_documentos habilitados
            await methods.insertDB(input, 'tipo_documento')
            return await dbpostgre('tipo_documento').where({ enable: true })
        },
        async updateTipoDocumento(_, input) {
            await methods.updateDB(input, 'tipo_documento')
            return await dbpostgre('tipo_documento').where({ enable: true })
        },
        async deleteTipoDocumento(_, { id }) {
            await methods.deleteDB(id, 'tipo_documento')
            return await dbpostgre('tipo_documento').where({ enable: true })
        }

    }

}