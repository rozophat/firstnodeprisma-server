const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList} = graphql;
const {authors, books} = require("../common");
const _ = require("lodash");
const models = require("../models");

const UserType = new GraphQLObjectType({
  name: "User",
  type: "Query",
  fields: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    joined: { type: GraphQLString },
    last_logged_in: { type: GraphQLString }
  }
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  type: "Query",
  fields: {
    id: { type: GraphQLString },
    creator_id: { type: GraphQLString },
    created: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString }
  }
});

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      author: {
        type: AuthorType,
        resolve(parent, args){
          //return _.find(authors, { id: parent.authorId });
          return models.Author.findOne({
            where : {
              id: parent.authorId
            }
          })
        }
      }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args){
          //return books.filter(book => book.authorId === parent.id)
          return models.Book1.findAll({
            where : {
              authorId: parent.id
            }
          })
        }
      }
  })
});

exports.AuthorType = AuthorType;
exports.BookType = BookType;
exports.UserType = UserType;
exports.ProjectType = ProjectType;
