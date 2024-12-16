import styled from 'styled-components';

const Connections = styled.main`
  display: grid;
  grid-template-columns: 2.5fr 2fr;
`;
const Content = styled.div`
  border-left: ${(props) => `1px solid ${props.theme.fifthGray}`};
  border-right: ${(props) => `1px solid ${props.theme.fifthGray}`};
`;
const Header = styled.header`
  display: flex;
  flex-direction: column;
  margin: 1rem 2rem 0;

  & > div:first-child {
    font-size: 2rem;
    font-weight: 700;
  }

  & > div:last-child {
    color: ${(props) => props.theme.secondaryGray};
  }
`;
const Navbar = styled.nav`
  & > ul {
    display: flex;

    & > li {
      width: 100%;
    }
  }
`;
const Empty = styled.div`
  display: grid;
  gap: 0.25rem;
  place-content: center;
  padding: 3rem 5rem 0;

  & > div:first-child {
    font-size: 3rem;
    font-weight: 700;
  }

  & > div:last-child {
    color: ${(props) => props.theme.secondaryGray};
  }
`;

export { Connections, Content, Header, Navbar, Empty };
