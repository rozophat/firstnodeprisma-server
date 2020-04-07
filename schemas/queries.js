//const { db } = require("../pgAdaptor");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList} = require("graphql");
const { UserType, ProjectType, BookType, AuthorType } = require("./types");
const _ = require("lodash");
const {authors, books} = require("../common");
const models = require("../models");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    // project: {
    //   type: ProjectType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parentValue, args) {
    //     const query = `SELECT * FROM project WHERE id=$1`;
    //     const values = [args.id];

    //     return db
    //       .one(query, values)
    //       .then(res => res)
    //       .catch(err => err);
    //   }
    // },
    // user: {
    //   type: UserType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parentValue, args) {
    //     const query = `SELECT * FROM users WHERE id=$1`;
    //     const values = [args.id];

    //     return db
    //       .one(query, values)
    //       .then(res => res)
    //       .catch(err => err);
    //   }
    // },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve(parentValue, args) {
          // code to get data from db / other source
          //return _.find(books, { id: args.id });
          return models.Book.findOne({
            where : {
              id: args.id
            }
          })
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve(parentValue, args) {
          // code to get data from db / other source
          //return _.find(authors, { id: args.id });
          return models.Author.findOne({
            where : {
              id: args.id
            }
          })
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parentValue, args) {
          // code to get data from db / other source
          //return books;
          return models.Book.findAll();
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parentValue, args) {
          // code to get data from db / other source
          //return authors;
          return models.Author.findAll();
      }
    }
  }
});

exports.query = RootQuery;
