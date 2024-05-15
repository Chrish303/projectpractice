const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers');

const app = new ApolloServer({ typeDefs,resolvers });

const port = 4000


app.listen().then((port)=>{
    console.log(`server runing at ${port}`)
})