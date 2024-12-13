import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  *,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  font-family: inherit;
  user-select: none;
  --webkit-user-select: none;
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

#root {
  color: ${theme.secondaryWhite};
  background-color: ${theme.black};
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  border: none;
  background-color: inherit;
}

button:hover {
  cursor: pointer;
}

dialog {
  background-color: ${theme.black};
  color: ${theme.secondaryWhite};
  place-self: center;
  border: none;
}

input, textarea {
  background-color: inherit;
  color: inherit;
}

ul {
  list-style: none;
  padding: 0;
}
`;

export default GlobalStyle;
