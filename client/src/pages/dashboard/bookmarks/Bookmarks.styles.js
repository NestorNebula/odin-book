import styled from 'styled-components';

const Bookmarks = styled.main`
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
  display: grid;
  grid-template-rows: auto 1fr;
  width: clamp(40vw, 600px, 80vw);

  @media (max-width: 500px) {
    width: 100vw;
  }
`;
const Header = styled.header`
  font-size: 2.25rem;
  font-weight: 700;
  padding: 1rem;
`;
const EmptyBookmarks = styled.div`
  place-self: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & > div:first-child {
    font-size: 3rem;
    font-weight: 800;
  }

  & > div:last-child {
    color: ${(props) => props.theme.secondaryGray};
  }
`;

export { Bookmarks, Content, Header, EmptyBookmarks };
