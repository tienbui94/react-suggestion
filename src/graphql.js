import gql from 'graphql-tag';

export const GET_POKEMON_INFO = gql`
    {
        Country {
            name
            capital
        }
    }
`;
