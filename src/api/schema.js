const resolvers = require('./resolvers')
const { makeExecutableSchema } = require('graphql-tools')

const PessoaFisicaSchema = require('./schemas/pessoafisica_schema')
const DocumentsSchema = require('./schemas/documents_schema')
const TipoDocumentoSchema = require('./schemas/tipo_documento_schema')

const typeDefs = `

    scalar Date
    scalar DateTime
    scalar ScalarJson

    ${PessoaFisicaSchema}
    ${DocumentsSchema}
    ${TipoDocumentoSchema}

    type dblog {
        row: ScalarJson
        method: String
        table: String
        user: String
        CreatedAt: DateTime
    }

    type Query {

        getPessoaFisica(id: ID, cpf: String, nome: String): [PessoaFisica]

        getDocuments(id_pessoafisica: ID!): [Document]

        getTipoDocumento(enable: Boolean): [Tipo_Documento]

        searchLog(table: String!, id: Int!): [dblog]
    }    
    
    type Mutation {

        createPessoaFisica(input: PessoaFisicaInput): PessoaFisica

        createDocument(input: DocumentInput): [Document]

        createTipoDocumento(input: Tipo_DocumentoInput): [Tipo_Documento]

        updateTipoDocumento(input: Tipo_DocumentoUpdate): [Tipo_Documento]

        deleteTipoDocumento(input: Tipo_DocumentoDelete): [Tipo_Documento]
    }

`

module.exports = makeExecutableSchema({ typeDefs, resolvers })