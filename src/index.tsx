import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { GlobalStyle } from "./globalStyle";
import Routes from "./pages/routes";
import 'antd/dist/antd.css';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.producthunt.com/v2/api/graphql",
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);