import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100vh;
  }

  body, button, input {
    font-family: 'Montserrat', sans-serif;
  }

  #root {
    display: flex;
    justify-content: center;
    overflow-y: hidden;
  }

  ::-webkit-scrollbar {
    width: 6px!important;
    height: 6px!important;
  }
  ::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,.2);
  }
  ::-webkit-scrollbar-track {
      background: hsla(0,0%,100%,.1);
  }

`;