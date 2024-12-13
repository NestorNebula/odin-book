import styled from 'styled-components';

const Navbar = styled.nav`
  & > ul {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 0.5rem;
    font-size: 2rem;
    padding: 1rem 0 2rem;
    & > button {
      padding: 1.5rem;
    }
    justify-self: center;

    @media (max-width: 1275px) {
      align-items: center;
      justify-self: end;

      & > button {
        padding: 0.5rem;
      }
    }
  }
`;
const LogoItem = styled.li`
  width: 5rem;
  padding: 0 1rem;
`;
const PostIcon = styled.img`
  width: 5rem;
  padding: 1rem;
`;

export { Navbar, LogoItem, PostIcon };
