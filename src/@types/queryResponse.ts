export type ResponseType<T, Name extends string> = {
  [key in Name]: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
      startCursor: string;
    };
    totalCount: number;
    edges: {
      cursor: string;
      node: T;
      __typename: string;
    }[];
  };
};
