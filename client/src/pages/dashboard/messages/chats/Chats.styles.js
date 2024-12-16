import styled from 'styled-components';

const Chats = styled.div`
  display: flex;
  flex-direction: column;
`;
const Chat = styled.div`
  color: ${(props) => props.theme.secondaryGray};
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0 1rem;
  padding: 1.5rem;

  & > img {
    grid-row: 1 / 3;
    align-self: center;
  }
`;
const ChatInfos = styled.div`
  display: flex;
  gap: 0.25rem;

  & > div:first-child {
    color: ${(props) => props.theme.secondaryWhite};
    font-weight: 700;
  }
`;
const LastMessage = styled.div`
  justify-self: start;
  max-width: 100%;
  white-space: nowrap;
  overflow-x: hidden;
`;
const Button = styled.button`
  background-color: ${(props) =>
    props.$active ? props.theme.mainGray : props.theme.black};
  border-right: ${(props) =>
    props.$active ? `2px solid ${props.theme.mainBlue}` : 'none'};

  &:hover {
    background-color: ${(props) => props.theme.mainGray};
  }
`;

export { Chats, Chat, ChatInfos, LastMessage, Button };
