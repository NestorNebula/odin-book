import styled from 'styled-components';
import { Background } from '../profileheader/ProfileHeader.styles';

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;
const BackgroundContainer = styled(Background)`
  position: relative;
  width: clamp(30vw, 500px, 80vw);
  background-color: black;
`;
const AvatarContainer = styled.div`
  position: relative;
  top: -5rem;
  display: grid;
  width: fit-content;

  & > img {
    height: 10rem;
    width: 10rem;
    border: ${(props) => `5px solid ${props.theme.black}`};
  }

  & > div {
    position: absolute;
    place-self: center;
    opacity: 0.75;

    & > label {
      padding: 1rem;
      background-color: ${(props) => props.theme.secondaryBlack};
      border-radius: 5rem;
      filter: none;

      & > img {
        width: 2rem;
        filter: brightness(0) saturate(100%) invert(96%) sepia(11%)
          saturate(1079%) hue-rotate(183deg) brightness(106%) contrast(92%);
      }
    }
  }

  @media (max-width: 800px) {
    top: -3.5rem;

    & > img {
      height: 7rem;
      width: 7rem;
    }
  }
`;
const File = styled.img`
  height: inherit;
  width: inherit;
  object-fit: cover;
`;
const ImgButtons = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  gap: 1rem;
  place-self: center;
  gap: 1rem;
  opacity: 0.75;

  & > button,
  & label {
    padding: 1rem;
    background-color: ${(props) => props.theme.secondaryBlack};
    border-radius: 5rem;
    filter: none;
    width: fit-content;

    & > img {
      width: 2.5rem;
      filter: brightness(0) saturate(100%) invert(96%) sepia(11%)
        saturate(1079%) hue-rotate(183deg) brightness(106%) contrast(92%);
    }
  }
`;
const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  & textarea {
    border: ${(props) => `1px solid ${props.theme.thirdGray}`};
    border-radius: 5px;
    padding: 2.25rem 1rem 0.75rem;
    width: 100%;

    &:focus {
      border: ${(props) => `2px solid ${props.theme.mainBlue}`};
      outline: none;
    }

    &:not(:placeholder-shown) + label {
      top: 0rem;
      left: 0.5rem;
      font-size: 1.25rem;
    }
  }

  & + button {
    margin: 1rem 2rem;
  }
`;

export {
  ProfileForm,
  BackgroundContainer,
  AvatarContainer,
  File,
  ImgButtons,
  Inputs,
};
