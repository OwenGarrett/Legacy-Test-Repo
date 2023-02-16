import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_ART = gql`
  mutation addArt($artId: Int!, $artTitle: String!,$artImage: String) {
    addArt(artId: $artId, artTitle: $artTitle, artImage: $artImage) {
      _id
      artId
      artTitle
      artImage
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;


export const ADD_THCOMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addArtComment($aId: ID!, $commentText: String!) {
    addArtComment(aId: $aId, commentText: $commentText) {
      _id
      artId
      artTitle
      artImage
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const DEL_ART = gql`
  mutation removeArt($aId: ID!) {
    removeArt(aId: $aId) {
      _id
      artId
      artTitle
      artImage
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const DEL_COMMENT = gql`
  mutation removeArtComment($aId: ID!, $commentId: ID!) {
    removeArtComment(aId: $aId, commentId: $commentId) {
     _id
      artId
      artTitle
      artImage
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;