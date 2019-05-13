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

function Posts() {
  return (
    <Query query={getPosts} variables={{ query: '' }}>
      {({ data, error }) => (
        <div id="posts">
          {data &&
            data.posts &&
            data.posts.map(
              post =>
                (
                  <div key={post.id} id="post">
                    <h3>{post.title}</h3>
                    <p style={{ fontFamily: 'Verdana' }}>{post.body}</p>
                  </div>
                ) || <div>{error.message}</div>,
            )}
        </div>
      )}
    </Query>
  );
}

const getPosts = gql`
  query getPosts($query: String) {
    posts(query: $query) {
      id
      title
      body
    }
  }
`;

Posts.propTypes = {};

export default Posts;
