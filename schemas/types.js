const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList} = graphql;
const _ = require("lodash");
const {prisma} = require("../prisma/generated/prisma-client");

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      author: {
        type: AuthorType,
        resolve(parent, args){
          return prisma.author({id: Number(parent.authorId)})
        }
      }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLString },
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args){
          return prisma.book1s({
            where: {
              authorId: parent.id 
            }
          })
        }
      }
  })
});

exports.AuthorType = AuthorType;
exports.BookType = BookType;
