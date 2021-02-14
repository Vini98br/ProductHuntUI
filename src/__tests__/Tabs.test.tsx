import React from "react";
import { create, act } from "react-test-renderer";
import { theme } from "../theme";
import { ThemeProvider } from "styled-components";
import Tabs from "../components/Tabs";

test("Render Tabs", async () => {
  const { root } = create(
    <ThemeProvider theme={theme}>
      <Tabs
        active={"popular"}
        tabs={[
          { label: "Popular", value: "popular" },
          { label: "Newest", value: "newest" },
        ]}
      />
    </ThemeProvider>
  );
  const popularTab = root.findByProps({id: "popular-tab"});
  const newestTab = root.findByProps({id: "newest-tab"});

  expect(popularTab.props.children).toEqual("Popular");
  expect(newestTab.props.children).toEqual("Newest");
});

test("Change tabs", async () => {
  let root;
  act(() => {
    root = create(
      <ThemeProvider theme={theme}>
        <Tabs
          active={"popular"}
          tabs={[
            { label: "Popular", value: "popular" },
            { label: "Newest", value: "newest" },
          ]}
        />
      </ThemeProvider>
    );
  });

  // make assertions on root
  expect(root.toJSON()).toMatchSnapshot();

  act(() => {
    root.update(
      <ThemeProvider theme={theme}>
        <Tabs
          active={"newest"}
          tabs={[
            { label: "Popular", value: "popular" },
            { label: "Newest", value: "newest" },
          ]}
        />
      </ThemeProvider>
    );
  });

  // make assertions on root
  expect(root.toJSON()).toMatchSnapshot();
});
