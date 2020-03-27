require('dotenv').config()
const { ApolloServer } = require("apollo-server");
const { MarvelAPI } = require("./marvelAPI")

const typeDefs = require("./schema");

const resolvers = {
  Query: {
    characters: async (_source, { limit, offset, nameStartsWith }, { dataSources }) => {
      return dataSources.marvelAPI.getCharacters(limit, offset, nameStartsWith);
    },
    getCharacterById: async (_source, { id }, { dataSources }) => {
      return dataSources.marvelAPI.getCharacterById(id);
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      marvelAPI: new MarvelAPI(),
    };
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
});

const port = process.env.PORT || 4000

server.listen(port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
