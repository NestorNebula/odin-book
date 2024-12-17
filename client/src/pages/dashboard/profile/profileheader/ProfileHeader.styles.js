import styled from 'styled-components';

const ProfileHeader = styled.section`
  display: flex;
  flex-direction: column;
`;
const AvatarContainer = styled.div`
  position: relative;
`;
const Background = styled.div`
  width: 100%;
  height: clamp(10vw, 200px, 30vw);
  background-color: #343639;

  & > img {
    height: inherit;
    width: inherit;
    object-fit: cover;
  }

  & + img {
    height: 15rem;
    width: 15rem;
    border-radius: 15rem;
    border: ${(props) => `5px solid ${props.theme.black}`};
    position: absolute;
    left: 1rem;
    bottom: -7.5rem;
    background-color: ${(props) => props.theme.black};

    @media (max-width: 1000px) {
      height: 12.5rem;
      width: 12.5rem;
      border-radius: 12.5rem;
      bottom: -6.5rem;
    }

    @media (max-width: 500px) {
      height: 10rem;
      width: 10rem;
      border-radius: 10rem;
      bottom: -5rem;
    }

    @media (max-width: 300px) {
      height: 7.5rem;
      width: 7.5rem;
      border-radius: 7.5rem;
      bottom: -3.75rem;
    }
  }
`;
const Buttons = styled.div`
  align-self: end;
  display: flex;
  gap: 1rem;
  padding: 1rem;
`;
const UserInformations = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.5rem 0rem;
  white-space: pre-wrap;

  & > div:first-child {
    font-size: 2.25rem;
    font-weight: 800;
    padding-top: 0.5rem;
  }

  & > div:nth-child(2) {
    color: ${(props) => props.theme.secondaryGray};
  }

  & > div:last-child {
    padding: 1rem 0;
  }
`;
const UserDetails = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0 1rem;
  color: ${(props) => props.theme.secondaryGray};

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
const UserDetail = styled.div`
  display: flex;
  gap: 0.25rem;

  & > img {
    width: 2.5rem;
    filter: brightness(0) saturate(100%) invert(48%) sepia(2%) saturate(818%)
      hue-rotate(160deg) brightness(93%) contrast(89%);
  }

  & > a {
    color: ${(props) => props.theme.mainBlue};
  }
`;
const Connections = styled.div`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  color: ${(props) => props.theme.secondaryGray};

  & > a:hover {
    text-decoration: ${(props) => `underline ${props.theme.secondaryWhite}`};
  }
`;
const Number = styled.span`
  color: ${(props) => props.theme.secondaryWhite};
  font-weight: 700;
`;

export {
  ProfileHeader,
  AvatarContainer,
  Background,
  Buttons,
  UserInformations,
  UserDetails,
  UserDetail,
  Connections,
  Number,
};
