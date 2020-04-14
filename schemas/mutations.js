const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;
const { BookType, AuthorType } = require("./types");
const {prisma} = require("../prisma/generated/prisma-client");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: {type: GraphQLInt}
      },
      resolve(parentValue, args){
        return prisma.createBook1({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
      }
    },
    addAuthor: {
        type: AuthorType,
        args: {
          id: { type: GraphQLID },
          name: { type: GraphQLString },
          age: { type: GraphQLString }
        },
        resolve(parentValue, args) {
          return prisma.createAuthor({
            name: args.name,
            age: args.age
          });
        }
      }
  }
});

exports.mutation = RootMutation;
