import styled from 'styled-components';

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 15px;
  padding: 1rem;
`;
const Title = styled.div`
  font-size: 2.25rem;
  font-weight: 700;
`;
const Users = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const User = styled.div`
  display: grid;
  grid-template-columns: 1fr 10rem;

  & > a {
    display: grid;
    gap: 0 0.75rem;
    grid-template-columns: auto 1fr;

    & > img {
      grid-row: 1 / 4;
    }
  }
`;
const DisplayName = styled.div`
  font-weight: 700;
  overflow-x: hidden;
  white-space: nowrap;
`;
const Username = styled.div`
  color: ${(props) => props.theme.secondaryGray};

  overflow-x: hidden;
  white-space: nowrap;
`;
const Bio = styled.div``;

export { UserList, Title, Users, User, DisplayName, Username, Bio };
