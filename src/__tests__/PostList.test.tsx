import React from "react";
import { create } from "react-test-renderer";
import { theme } from "../theme";
import { ThemeProvider } from "styled-components";
import PostsList from "../components/PostsList";

const mockedPosts = [
  {
    createdAt: "2021-02-13T09:11:47Z",
    description:
      "Community Fund is an initiative by The Product Folks to help communities with mentorship, funding, and important resources required to go from 0-1.",
    id: 284452,
    name: "Community Fund",
    thumbnail: {
      __typename: "Media",
      url:
        "https://ph-files.imgix.net/3682ba63-9534-4e9f-be7d-c547aecac5eb.gif?auto=format&fit=crop",
    },
    url:
      "https://www.producthunt.com/posts/community-fund?utm_campaign=producthunt-api&utm_medium=api-v2&utm_source=Application%3A+ps_arena3+%28ID%3A+42116%29",
    votesCount: 263,
    fav: false
  },
  {
    createdAt: "2021-02-13T09:11:47Z",
    description:
      "Community Fund is an initiative by The Product Folks to help communities with mentorship, funding, and important resources required to go from 0-1.",
    id: 284453,
    name: "Community Fund",
    thumbnail: {
      __typename: "Media",
      url:
        "https://ph-files.imgix.net/3682ba63-9534-4e9f-be7d-c547aecac5eb.gif?auto=format&fit=crop",
    },
    url:
      "https://www.producthunt.com/posts/community-fund?utm_campaign=producthunt-api&utm_medium=api-v2&utm_source=Application%3A+ps_arena3+%28ID%3A+42116%29",
    votesCount: 263,
    fav: true
  },
];

test("Render Posts List", async () => {
  const root = create(
    <ThemeProvider theme={theme}>
      <PostsList posts={mockedPosts} />
    </ThemeProvider>
  );
  expect(root.toTree()?.props.children.props.posts.length).toBeGreaterThanOrEqual(2);
});