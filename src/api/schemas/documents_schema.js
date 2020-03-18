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
    id_base64: String!
    foto_documento: foto_documento
}

type foto_documento {
    CreatedAt: DateTime
    base64: String
}

input DocumentInput {
    id_pessoafisica: Int!
    id_tipo_documento: Int!
    ${DocumentsAtribs}
    base64img: String
}

input DocumentUpdate {
    id: ID!
    deleted: Boolean
    id_tipo_documento: Int
    ${DocumentsAtribs}
}

`

module.exports = DocumentsSchema