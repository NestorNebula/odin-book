import styled from 'styled-components';
import { Empty } from '@pages/dashboard/connections/Connections.styles';

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
const Repost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & > div:first-child {
    padding: 1rem 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    filter: brightness(0) saturate(100%) invert(47%) sepia(3%) saturate(575%)
      hue-rotate(162deg) brightness(95%) contrast(92%);

    & > img {
      width: 2rem;
    }
  }
`;

export { HomeContent, Navbar, Posts, Repost, Empty };
