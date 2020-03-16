const TipoDocumentoSchema = `


type Tipo_Documento {
    id: ID
    desc: String
    enable: Boolean
}

input Tipo_DocumentoUpdate {
    id: ID!
    enable: Boolean!
}
input Tipo_DocumentoDelete {
    id: ID!
}
input Tipo_DocumentoInput {
    desc: String!
    enable: Boolean!
}
`

module.exports = TipoDocumentoSchema