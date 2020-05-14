const dbpostgre = require('../../config/postgredb')
const dbdocs = require('../schema_docs_mongodb')
const appLog = require('../schema_logs_mongodb')

module.exports = {

    async insertDB(atribs, table) {
        let result = await dbpostgre(table).insert(atribs, '*')
        let { id } = result[0]
        //grava log no mongodb
        appLog.create({ id, atribs: result[0], table, user: '', method: 'insert' })
        return result[0]
    },

    async updateDB(id, atribs, table) {
        let result = await dbpostgre(table).update(atribs, '*').where({ id })
        //grava log no mongodb
        appLog.create({ id, atribs, table, user: '', method: 'update' })
        return result[0]
    },

    async deleteDB(id, table) {
        let result = await dbpostgre(table).delete('*').where({ id })
        //grava log no mongodb
        appLog.create({ id, table, user: '', method: 'delete' })
        return result[0]
    },

    async insertDocument(input) {
        //nao vai ser possivel usar o metodo insert generico, pois precisa gravar primeiro o base64 do documento no mongo db 
        //e pegar o _id do mongo pra gravar no postgre junto com os dados do documento.
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
            let {id} = result[0]
            //grava log no mongodb do registro criado
            appLog.create({ id, atribs: result[0], method: 'insert', table: 'documentos', user: '' })
        }

        return await dbpostgre.select('documentos.*', 'tipo_documento.desc').from('documentos')
            .innerJoin('tipo_documento', 'documentos.id_tipo_documento', 'tipo_documento.id')
            .where({ id_pessoafisica: input.id_pessoafisica })
    }
}