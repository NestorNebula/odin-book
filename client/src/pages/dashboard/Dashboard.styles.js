import styled from 'styled-components';

const Dashboard = styled.main`
  height: 100vh;
  font-size: 1.5rem;
  display: grid;
  grid-template-rows: auto 1fr;
  justify-content: center;

  & > main {
    overflow-y: scroll;

    @media (max-width: 500px) {
      height: 90%;
    }
  }

  @media (min-width: 501px) {
    grid-template-columns: auto 1fr;
  }

  @media (min-width: 600px) {
    grid-template-columns: 15vw 1fr;
  }

  @media (min-width: 1000px) {
    grid-template-columns: 10vw 1fr;
  }

  @media (min-width: 1275px) {
    grid-template-columns: 25vw 1fr;
  }
`;
const Information = styled.div`
  position: fixed;
  bottom: 5vh;
  z-index: 3;
  background-color: ${(props) =>
    props.$error ? props.theme.red : props.theme.mainBlue};
  padding: 1rem;
  border-radius: 5px;
  justify-self: center;
`;

export { Dashboard, Information };
