const dbpostgre = require('../config/postgredb')
const dbdocs = require('../schema_docs_mongodb')
const appLog = require('../schema_logs_mongodb')

module.exports = {

    async insertDB(input, table) {
        let result = await dbpostgre(table).insert(input, '*')
        //grava log no mongodb
        appLog.create({ row: input, method: 'insert', table: table, user: '' })
        return result[0]
    },
    
    async updateDB(input, table) {
        let result = await dbpostgre(table).update(input, '*').where({ id: input.id })
        //grava log no mongodb
        appLog.create({ row: input, method: 'update', table: table, user: '' })
        return result[0]
    },

    async deleteDB(input, table) {
        let result = await dbpostgre(table).delete('*').where({ id: input.id })
        //grava log no mongodb
        appLog.create({ row: input, method: 'delete', table: table, user: '' })
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
            //grava log no mongodb do registro criado
            appLog.create({ row: result[0], method: 'insert', table: 'documentos', user: '' })
        }

        return await dbpostgre.select('documentos.*', 'tipo_documento.desc').from('documentos')
            .innerJoin('tipo_documento', 'documentos.id_tipo_documento', 'tipo_documento.id')
            .where({ id_pessoafisica: input.id_pessoafisica })
    }
}