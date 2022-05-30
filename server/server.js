const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);
})

io.listen(httpServer);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const startApolloServer = async (typeDefs, resolvers) => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  httpServer.listen(
    PORT
  ,
  () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
  }
);
};

startApolloServer();



