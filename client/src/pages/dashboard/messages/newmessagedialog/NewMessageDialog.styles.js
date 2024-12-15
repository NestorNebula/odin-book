import styled from 'styled-components';

const Title = styled.div`
  position: relative;
  top: -0.25rem;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 2rem;

  & + button {
    padding: 0.5rem 1.5rem;
  }
`;
const Users = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: clamp(300px, 40vw, 500px);
  padding: 2rem 1rem;
`;
const User = styled.button`
  color: ${(props) => props.theme.secondaryWhite};
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 0 1rem;

  & > img {
    grid-row: 1 / 3;
  }

  & > div:nth-child(2) {
    font-weight: 700;
  }

  & > div:nth-child(3) {
    color: ${(props) => props.theme.secondaryGray};
    grid-row: 2 / 3;
  }

  & > img:last-child {
    grid-column: 3 / 4;
    filter: brightness(0) saturate(100%) invert(60%) sepia(35%) saturate(6205%)
      hue-rotate(178deg) brightness(96%) contrast(96%);
    width: 2rem;
    justify-self: end;
  }
`;
const NoUser = styled.div`
  align-self: center;
  color: ${(props) => props.theme.secondaryGray};
`;

export { Title, Users, User, NoUser };
