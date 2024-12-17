import styled from 'styled-components';
import { Empty } from '../connections/Connections.styles';

const Explore = styled.main`
  display: grid;
  grid-template-columns: 2.25fr 2fr;
`;
const Content = styled.div`
  border-left: ${(props) => `1px solid ${props.theme.fifthGray}`};
  border-right: ${(props) => `1px solid ${props.theme.fifthGray}`};
  width: clamp(40vw, 600px, 80vw);

  & > form {
    margin: 0.5rem 1.5rem;
  }

  @media (max-width: 500px) {
    width: 100vw;
  }
`;
const Sidebar = styled.aside`
  border: ${(props) => `1px solid ${props.theme.fifthGray}`};
  border-radius: 15px;
  margin: 1rem 3rem;
  height: fit-content;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export { Explore, Content, Sidebar, Empty };
