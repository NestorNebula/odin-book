import styled from 'styled-components';

const HomeContent = styled.section`
  border-right: ${(props) => `1px solid ${props.theme.fifthGray}`};
`;
const Navbar = styled.nav`
  border-bottom: ${(props) => `1px solid ${props.theme.fifthGray}`};
  & > ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;
const Posts = styled.div`
  border-top: ${(props) => `1px solid ${props.theme.fifthGray}`};
`;

export { HomeContent, Navbar, Posts };
