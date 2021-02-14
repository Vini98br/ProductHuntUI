import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts(
    $featured: Boolean!
    $order: PostsOrder!
    $postedAfter: DateTime!
    $postedBefore: DateTime!
    $first: Int!
    $after: String!
  ) {
    posts(
      featured: $featured
      order: $order
      postedAfter: $postedAfter
      postedBefore: $postedBefore
      first: $first
      after: $after
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
        startCursor
      }
      edges {
        cursor
        node {
          id
          name
          createdAt
          url
          votesCount
          description
          thumbnail {
            url
          }
        }
      }
    }
  }
`;