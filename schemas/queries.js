//const { db } = require("../pgAdaptor");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList} = require("graphql");
const { BookType, AuthorType } = require("./types");
const _ = require("lodash");
const {prisma} = require("../prisma/generated/prisma-client");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve(parentValue, args) {
          return prisma.book1({id: Number(args.id)});
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve(parentValue, args) {
          return prisma.author({id: Number(args.id)});
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parentValue, args) {
          return prisma.book1s({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parentValue, args) {
          return prisma.authors({});
      }
    }
  }
});

exports.query = RootQuery;
