const graphql = require("graphql");
//const db = require("../pgAdaptor").db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;
const { BookType, AuthorType } = require("./types");
const models = require("../models");

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
      resolve(parentValue, args) {
        // const query = `INSERT INTO project(creator_id, created, title, description) VALUES ($1, $2, $3, $4) RETURNING title`;
        // const values = [
        //   args.creatorId,
        //   new Date(),
        //   args.title,
        //   args.description
        // ];

        // return db
        //   .one(query, values)
        //   .then(res => res)
        //   .catch(err => err);
        
        var newBook = models.Book1.build({
            name: args.name,
            genre: args.genre,
            authorId: args.authorId,
          });
        return newBook.save();
      }
    },
    addAuthor: {
        type: AuthorType,
        args: {
          id: { type: GraphQLID },
          name: { type: GraphQLString },
          age: { type: GraphQLInt }
        },
        resolve(parentValue, args) {
          
          var newAuthor = models.Author.build({
              name: args.name,
              age: args.age
            });
          return newAuthor.save();
        }
      }
  }
});

exports.mutation = RootMutation;
