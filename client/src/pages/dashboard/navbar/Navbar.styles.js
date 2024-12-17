import styled from 'styled-components';

const Navbar = styled.nav`
  & > ul {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 0.5rem;
    font-size: 2rem;
    padding: 1rem 0 2rem;
    & > li > button {
      padding: 1.5rem;
      width: 90%;

      @media (min-width: 1275px) {
        margin-right: 2rem;
      }
    }
    justify-self: end;
    min-width: 75%;

    & > a {
      width: 100%;
    }

    @media (max-width: 1275px) {
      align-items: center;
      justify-self: end;

      & > li > button {
        padding: 0.5rem;
      }
    }

    @media (max-width: 500px) {
      flex-direction: row;
      width: 100%;

      & > li > button {
        position: absolute;
        right: 0;
        top: 0;
        margin: 1rem;
        width: auto;

        & > img {
          width: 4rem;
        }
      }

      & > li > a > img {
        position: absolute;
        left: 0;
        top: 0;
        margin: 1rem;
      }
    }
  }

  @media (max-width: 500px) {
    position: sticky;
    background-color: ${(props) => props.theme.black};
    z-index: 2;
    height: 7.5rem;
  }
`;
const LogoItem = styled.li`
  width: 5rem;
  padding: 0 1rem;

  @media (max-width: 500px) {
    position: absolute;
    top: 0.25rem;
    width: 100%;
    display: grid;
    place-content: center;

    & > img {
      width: 4rem;
      margin: 1rem;
    }
  }
`;
const PostIcon = styled.img`
  width: 5rem;
  padding: 1rem;
`;
const Links = styled.li`
  height: fit-content;
  gap: 0.5rem;
  font-size: 2rem;

  & > ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  @media (max-width: 1275px) {
    justify-self: end;

    & > ul {
      align-items: center;
    }

    & > button {
      padding: 0.5rem;
    }
  }

  @media (max-width: 500px) {
    & > ul {
      flex-direction: row;
      place-content: center;
    }
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: black;
    padding: 1rem;
  }
`;

export { Navbar, LogoItem, PostIcon, Links };
