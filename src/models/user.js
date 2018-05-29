const user = {
  typeDefs: `
    type User
    {
      username: String!
    }

    # the schema allows the following query:
    type Query {
      user: User
    }
    `,
  defaults: {
    user: {
      username: '',
      __typename: 'User'
    }
  },
  resolvers: {
    Query: {
      user: () => {
        return {
          username: 'Souvik',
          __typename: 'User'
        };
      }
    },
    Mutation: {
      changeUsername: (_, { newname }, { cache }) => {
        cache.writeData({
          data: {
            user: { username: newname, __typename: 'User' }
          }
        });
        return newname;
      }
    }
  }
};

export default user;
