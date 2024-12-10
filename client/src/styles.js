import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  font-family: inherit;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

:root {
  font-size: 62.5%;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;

const theme = {
  mainWhite: '#EFF3F4',
  secondaryWhite: '#E7E9EA',
  mainBlue: '#1D9BF0',
  mainGray: '#212327',
  secondaryGray: '#71767A',
  thirdGray: '#787A7A',
  red: '#F4222D',
  green: '#00BA7C',
  black: '#000000',
};

export { GlobalStyle, theme };
