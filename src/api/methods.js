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

    async insertFotoDocumento(input) {
        let documento = await dbpostgre.select('*').from('documentos')
            .where({ id: input.idDocumento }).first()            
        if (documento) {
            await dbdocs.create({ idDocumento: input.idDocumento, base64: input.base64 })            
        }
        return documento || new Error('idDocumento nao encontrado')
        
    }
}