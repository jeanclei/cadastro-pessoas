const PessoaFisicaAtribs = require('./pessoafisica_atribs')

const pessoafisica_schema = `
type PessoaFisica {
    id: ID
    ${PessoaFisicaAtribs}
    Document: [Document]
}

input PessoaFisicaInput {
    ${PessoaFisicaAtribs}
}

`

module.exports = pessoafisica_schema