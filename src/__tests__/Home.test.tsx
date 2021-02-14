import React from "react";
import renderer from "react-test-renderer";
import Home from "../pages/Home";
import { MockedProvider } from "@apollo/react-testing";
import { GET_POSTS } from "../gql/post";
import moment from "moment";
import { theme } from "../theme";
import { ThemeProvider } from "styled-components";
import wait from "waait";
const mocks = [
  {
    request: {
      query: GET_POSTS,
      variables: {
        featured: true,
        order: "VOTES",
        postedAfter: moment().startOf("day").toISOString(),
        postedBefore: moment().endOf("day").toISOString(),
        first: 10,
        after: "",
      },
    },
    result: {
      data: {
        edge: [
          {
            node: {
              createdAt: "2021-02-13T09:11:47Z",
              description:
                "Community Fund is an initiative by The Product Folks to help communities with mentorship, funding, and important resources required to go from 0-1.",
              id: "284452",
              name: "Community Fund",
              thumbnail: {
                __typename: "Media",
                url:
                  "https://ph-files.imgix.net/3682ba63-9534-4e9f-be7d-c547aecac5eb.gif?auto=format&fit=crop",
              },
              url:
                "https://www.producthunt.com/posts/community-fund?utm_campaign=producthunt-api&utm_medium=api-v2&utm_source=Application%3A+ps_arena3+%28ID%3A+42116%29",
              votesCount: 263,
            },
          },
        ],
      },
    },
  },
];

test("renders learn", async () => {
  let component;
  renderer.act(() => {
    component = renderer.create(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={mocks} addTypename>
          <Home />
        </MockedProvider>
      </ThemeProvider>
    );
  });
  await wait(0); // wait for response

  const testInstance = component.root.findByProps({ id: "popular-tab" });
  expect(testInstance.props.children).toEqual("Popular");
});
