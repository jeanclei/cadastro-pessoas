const DocumentsAtribs = require('./documents_atribs')

const DocumentsSchema = `
type Document {
    id: ID
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
    ${DocumentsAtribs}
    base64img: String
}
`

module.exports = DocumentsSchema