import styled, { keyframes } from 'styled-components';

const Chat = styled.section`
  display: grid;
  grid-template-rows: auto 1fr auto;
`;
const CloseButton = styled.button`
  display: none;

  @media (max-width: 1000px) {
    display: block;
    padding: 1rem;
    border-radius: 2.5rem;

    &:hover {
      background-color: ${(props) => props.theme.secondaryBlack};
    }

    & > img {
      filter: brightness(0) saturate(100%) invert(95%) sepia(29%) saturate(323%)
        hue-rotate(54deg) brightness(118%) contrast(91%);
      width: 2.5rem;
    }
  }
`;
const messageDisplay = keyframes`
from {
  opacity: 0;
  width: 0;
}

to {
  opacity: 1;
  width: 100%;
}
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.75rem;
  font-weight: 800;
  padding: 1rem 1.5rem;
`;
const Messages = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 2rem;
  border-bottom: ${(props) => `1px solid ${props.theme.fifthGray}`};
  padding: 2rem;
  max-height: 82.5vh;
  overflow-y: scroll;
`;
const Message = styled.div`
  align-self: ${(props) => (props.$user ? 'end' : 'start')};
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  & > div,
  & > img {
    align-self: ${(props) => (props.$user ? 'end' : 'start')};
  }

  & > div:last-child {
    color: ${(props) => props.theme.secondaryGray};
    font-size: 1.25rem;
  }
  animation: ${messageDisplay} 0.5s ease-in;
`;
const File = styled.img`
  width: clamp(200px, 40%, 350px);
  border-radius: 15px;
  padding: 0.5rem 0;
`;
const Content = styled.div`
  padding: 1rem;
  background-color: ${(props) =>
    props.$user ? props.theme.mainBlue : props.theme.mainGray};
  border-radius: ${(props) =>
    props.$user ? '5rem 5rem 0' : '5rem 5rem 5rem 0'};
  width: fit-content;
`;

export { Chat, CloseButton, Header, Messages, Message, File, Content };
