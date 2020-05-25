const DocumentsAtribs = `
numero: String
dtemiss: Date
orgaoemiss: String
`

const DocumentsSchema = `
type Document {
    id: ID
    id_pessoafisica: Int
    id_tipo_documento: Int
    ${DocumentsAtribs}
    desc: String
    foto_documento: [foto_documento]
}

type foto_documento {
    idDocumento: Int
    CreatedAt: DateTime
    base64: String
}

input DocumentInput {
    id_pessoafisica: Int!
    id_tipo_documento: Int!
    ${DocumentsAtribs}
}

input DocumentUpdate {
    id: ID!
    deleted: Boolean
    id_tipo_documento: Int
    ${DocumentsAtribs}
}

`

module.exports = DocumentsSchema