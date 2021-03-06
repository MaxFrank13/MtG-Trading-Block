const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'https://immense-garden-06811.herokuapp.com']
  },
  allowUpgrades: false
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Broadcast to everyone
  // socket.on('send_message', (data) => {
  //   socket.broadcast.emit("receive_message", data )
  // });

  socket.on('send_message', (data) => {
    socket.to(data.chat_id).emit('receive_message', data );
  });
  
  socket.on('add_new_chat', (data) => {
    socket.to(data.username).emit('receive_new_message', data.chat)
  });

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`joined room ${data}`);
  })

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
})

io.listen(httpServer);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}


const startApolloServer = async (typeDefs, resolvers) => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  db.once('open', () => {
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    })
  })
};

startApolloServer(typeDefs, resolvers);
