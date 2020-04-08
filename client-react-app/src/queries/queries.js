import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
{
    authors{
        id
        name
    }
}
`;

const getBooksQuery = gql`
{
    books{
        id
        name
        genre
    }
}
`;

const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: Int!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

export {getAuthorsQuery, getBooksQuery, addBookMutation}
