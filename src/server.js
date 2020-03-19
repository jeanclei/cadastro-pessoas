const express = require('express')
const graphqlHTTP = require('express-graphql')
//const { buildSchema } = require('graphql')
const schema = require('./api/schema')

const mongoose = require('mongoose');
require('dotenv/config');
require('dotenv').config({path: '../.env'});
mongoose.connect(process.env.MONGODB_STRING,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const app = express()
app.use(express.json({limit: '15mb'}))

app.use('/api', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000)