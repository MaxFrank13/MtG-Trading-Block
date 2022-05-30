// import models & auth function

// initiate resolvers
const resolvers = {
  Query: {
    me: async (parent, args) => {
      console.log(parent, args);
    }
  }
}

// export resolvers
module.exports = resolvers;