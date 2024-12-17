import styled from 'styled-components';

const Settings = styled.main`
  display: grid;
  grid-template-columns: 2fr 2.5fr;
`;
const Content = styled.div`
  border-left: ${(props) => `1px solid ${props.theme.fifthGray}`};
  border-right: ${(props) => `1px solid ${props.theme.fifthGray}`};

  @media (max-width: 1000px) {
    display: ${(props) => props.$sectionActive && 'none'};
    width: clamp(40vw, 600px, 80vw);
  }

  @media (max-width: 500px) {
    width: 100vw;
  }
`;
const Header = styled.header`
  font-size: 2rem;
  font-weight: 700;
  padding: 1.25rem;
`;
const Navbar = styled.nav`
  & > ul {
    display: flex;
    flex-direction: column;
  }
`;
const NavbarButton = styled.button`
  background-color: ${(props) =>
    props.$active ? props.theme.mainGray : props.theme.black};
  color: ${(props) => props.theme.secondaryWhite};
  padding: 1.5rem;
  width: 100%;
  text-align: start;
  border-right: ${(props) =>
    props.$active ? `2px solid ${props.theme.mainBlue}` : 'none'};

  &:hover {
    background-color: ${(props) => props.theme.mainGray};
  }
`;
const Sidebar = styled.div`
  border-right: ${(props) => `1px solid ${props.theme.fifthGray}`};

  @media (max-width: 1000px) {
    display: ${(props) => !props.$sectionActive && 'none'};
    width: clamp(40vw, 600px, 80vw);
  }

  @media (max-width: 500px) {
    width: 100vw;
  }
`;

export { Settings, Content, Header, Navbar, NavbarButton, Sidebar };
