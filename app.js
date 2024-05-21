const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers');

const app = new ApolloServer({ typeDefs,resolvers });


app.listen().then(()=>{
    console.log('🚀...server runing at 4000...........🔥')
})