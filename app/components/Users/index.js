/**
 *
 * Posts
 *
 */

import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Users() {
  return (
    <Query query={getUsers} variables={{ query: '' }}>
      {({ data, error }) => (
        <div id="posts">
          {data &&
            data.users &&
            data.users.map(
              user =>
                (
                  <div key={user.id} id="post">
                    <p>{user.name}</p>
                  </div>
                ) || <div>{error.message}</div>,
            )}
        </div>
      )}
    </Query>
  );
}

const getUsers = gql`
  query getUsers($query: String) {
    users(query: $query) {
      id
      name
    }
  }
`;

Users.propTypes = {};

export default Users;
