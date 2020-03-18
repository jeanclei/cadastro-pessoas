let PessoaFisicaAtribs = `
profissao: String     
ppe: Boolean
ppe_cargo: String
repr_nome: String
repr_cpf: String
indic_nome: String
indic_cpf: String
id_parentesco: Int
nomepai: String
nomeconjuge: String
naturalidade: String
email2: String
fundador: Boolean
`

const pessoafisica_schema = `
type PessoaFisica {
    id: ID
    nome: String
    cpf: String
    dtnasc: Date
    sexo: String
    nomemae: String
    email: String
    ${PessoaFisicaAtribs}
    Document: [Document]
}

input PessoaFisicaInput {
    nome: String!
    cpf: String!
    dtnasc: Date!
    sexo: String!
    nomemae: String!
    email: String!
    ${PessoaFisicaAtribs}
}

input PessoaFisicaUpdate {
    id: ID!
    nome: String
    cpf: String
    dtnasc: Date
    sexo: String
    nomemae: String
    email: String
    ${PessoaFisicaAtribs}
}
`
module.exports = pessoafisica_schema