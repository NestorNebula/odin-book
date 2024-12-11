import styled from 'styled-components';

const Dashboard = styled.main`
  height: 100vh;
  font-size: 1.5rem;
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
`;
const Information = styled.div`
  position: fixed;
  bottom: 5vh;
  z-index: 3;
  background-color: ${(props) =>
    props.$error ? props.theme.red : props.theme.green};
  padding: 1rem;
  border-radius: 5px;
  justify-self: center;
`;

export { Dashboard, Information };
