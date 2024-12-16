import styled from 'styled-components';

const Post = styled.main`
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
  width: clamp(40vw, 600px, 85vw);
`;
const Header = styled.header`
  font-size: 2rem;
  font-weight: 700;
  padding: 1rem 2rem;
`;

export { Post, Content, Header };
