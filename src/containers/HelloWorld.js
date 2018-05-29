import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import logger from '../logger';

const HELLO_WORLD_QUERY = gql`
  query {
    hello
    user @client
  }
`;

const HelloWorld = props => (
  <Query query={HELLO_WORLD_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <div>Fetching Data...</div>;
      if (error) {
        logger.error(error);
        return <div>Error occured!! </div>;
      }

      return (
        <div>
          {data.hello} {data.user.username}
        </div>
      );
    }}
  </Query>
);

export default HelloWorld;
