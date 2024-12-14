import styled from 'styled-components';

const ExploreResult = styled.section`
  display: flex;
  flex-direction: column;
`;
const Navbar = styled.nav`
  border-bottom: ${(props) => `1px solid ${props.theme.fifthGray}`};
  & > ul {
    display: flex;
    justify-content: space-between;

    & > li {
      width: 100%;
    }
  }
`;
const Posts = styled.div``;
const Media = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(3, calc(${props.$width / 3}px - 0.25rem))`};
  gap: 0.25rem;
  height: ${(props) => `calc(${props.$width / 3}px - 0.25rem)`};

  & > a {
    height: inherit;
    & > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;

export { ExploreResult, Navbar, Posts, Media };
