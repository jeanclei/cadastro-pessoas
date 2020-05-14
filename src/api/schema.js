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

        updatePessoaFisica(id: ID!, atribs: PessoaFisicaUpdate): PessoaFisica

        createDocument(input: DocumentInput): [Document]

        updateDocument(input: DocumentUpdate): [Document]

        createTipoDocumento(desc: String!): [Tipo_Documento]

        updateTipoDocumento(id: ID!, enable: Boolean!): [Tipo_Documento]

        deleteTipoDocumento(id: ID!): [Tipo_Documento]
    }

`

module.exports = makeExecutableSchema({ typeDefs, resolvers })