import styled from 'styled-components';
import { Empty } from '../connections/Connections.styles';

const Notifications = styled.main`
  display: grid;
  grid-template-columns: 2.5fr 2fr;

  & > aside {
    @media (max-width: 1000px) {
      display: none;
    }
  }
`;
const Content = styled.div`
  border-left: ${(props) => `1px solid ${props.theme.fifthGray}`};
  border-right: ${(props) => `1px solid ${props.theme.fifthGray}`};
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: clamp(40vw, 600px, 80vw);

  @media (max-width: 500px) {
    width: 100vw;
  }
`;
const Header = styled.header`
  font-size: 2.25rem;
  font-weight: 700;
  padding: 1rem;
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.black};
  z-index: 2;
`;

export { Notifications, Content, Header, Empty };
