import styled from 'styled-components';

const Messages = styled.main`
  display: grid;
  grid-template-columns: 2fr 2.75fr;
  border-left: ${(props) => `1px solid ${props.theme.fifthGray}`};
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  border-right: ${(props) => `1px solid ${props.theme.fifthGray}`};

  @media (max-width: 1000px) {
    display: ${(props) => props.$activeChat && 'none'};
    width: clamp(30vw, 600px, 80vw);
  }

  @media (max-width: 500px) {
    width: 100vw;
  }
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  font-size: 2.25rem;
  font-weight: 700;
  padding: 1.5rem;

  & img {
    width: 2.5rem;
    filter: brightness(0) saturate(100%) invert(97%) sepia(48%) saturate(27%)
      hue-rotate(272deg) brightness(109%) contrast(91%);
  }
`;
const NewMessage = {
  Main: styled.div`
    place-self: center;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 65%;

    & > button {
      margin-top: 2rem;
      width: fit-content;
      padding: 1.5rem;
      font-size: 1.75rem;
      font-weight: 700;
    }
  `,
  Header: styled.div`
    font-size: 3rem;
    font-weight: 800;
  `,
  Content: styled.div`
    color: ${(props) => props.theme.secondaryGray};
  `,
};
const Sidebar = styled.aside`
  border-right: ${(props) => `1px solid ${props.theme.fifthGray}`};
  display: grid;

  @media (max-width: 1000px) {
    display: ${(props) => !props.$activeChat && 'none'};
    width: clamp(40vw, 600px, 80vw);
  }

  @media (max-width: 500px) {
    width: 100vw;
  }
`;

export { Messages, Content, Header, NewMessage, Sidebar };
