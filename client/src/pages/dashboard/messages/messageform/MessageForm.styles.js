import styled from 'styled-components';

const MessageForm = styled.form`
  display: grid;
  grid-template-columns: auto 1fr auto;
  background-color: ${(props) => props.theme.mainGray};
  margin: 0.75rem 1.25rem;
  border-radius: 15px;

  & > button {
    align-self: center;
    background-color: inherit;

    &:hover {
      background-color: ${(props) => props.theme.secondaryBlack};
    }
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-left: 2rem;
`;
const FileContainer = styled.div`
  position: relative;
  /*   width: clamp(100px, 100%, 250px);
  height: clamp(50px, 100%, 150px); */
  width: fit-content;

  & > button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: ${(props) => props.theme.secondaryBlack};

    & > img {
      width: 2.5rem;
      filter: brightness(0) saturate(100%) invert(99%) sepia(0%) saturate(2961%)
        hue-rotate(77deg) brightness(112%) contrast(91%);
    }
  }
`;
const File = styled.img`
  max-width: 250px;
  max-height: 175px;
  object-fit: cover;
  border-radius: 15px;
  margin: 1.5rem 0;
`;
const SendImg = styled.img`
  filter: brightness(0) saturate(100%) invert(45%) sepia(62%) saturate(658%)
    hue-rotate(161deg) brightness(103%) contrast(99%);
  width: 2rem;
`;

export { MessageForm, Content, FileContainer, File, SendImg };
