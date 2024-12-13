import styled from 'styled-components';

const Repost = styled.div`
  grid-column: 1 / 3;
  padding: 0 1rem 1rem;

  & > a {
    color: ${(props) => props.theme.mainBlue};
  }

  & + a {
    top: 4rem !important;
  }
`;
const Post = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 5rem 1fr;
  gap: 0 1rem;
  padding: 1rem;
  border-bottom: ${(props) =>
    !props.$details && `1px solid ${props.theme.fifthGray}`};

  & > a {
    position: absolute;
    left: 1rem;
    top: 0.75rem;
  }
`;
const Header = styled.header`
  position: relative;
  grid-column: 2 / 3;
  display: flex;
  flex-direction: ${(props) => (props.$details ? 'column' : 'row')};
  gap: ${(props) => !props.$details && '0.5rem'};

  & > div:first-child {
    font-weight: 700;
  }

  & > div:nth-child(2),
  & > div:nth-child(3) {
    filter: brightness(0) saturate(100%) invert(48%) sepia(4%) saturate(425%)
      hue-rotate(141deg) brightness(95%) contrast(90%);
  }

  & > div:last-child {
    margin-left: auto;
    filter: none;
  }
`;
const Settings = styled.div`
  position: absolute;
  right: 1rem;

  & > button:first-child {
    width: 3rem;
    background-color: inherit;
    filter: brightness(0) saturate(100%) invert(48%) sepia(4%) saturate(425%)
      hue-rotate(141deg) brightness(95%) contrast(90%);

    & > img {
    }
  }
`;
const DeleteButton = styled.button`
  position: absolute;
  left: -8rem;
  top: 0rem;
  display: flex;
  align-items: center;
  font-size: 1rem;
  filter: brightness(0) saturate(100%) invert(23%) sepia(82%) saturate(4849%)
    hue-rotate(346deg) brightness(97%) contrast(97%);

  & > img {
    width: 2rem;
  }
`;
const Content = styled.div`
  grid-column: ${(props) => (props.$details ? '1 / 3' : '2 / 3')};

  & > a > img {
    border-radius: 15px;
    padding-top: 1rem;
    width: 100%;
  }
`;
const FullDate = styled.div`
  padding: 1rem 0;
  filter: brightness(0) saturate(100%) invert(48%) sepia(4%) saturate(425%)
    hue-rotate(141deg) brightness(95%) contrast(90%);
`;
const Buttons = styled.div`
  grid-column: ${(props) => (props.$details ? '1 / 3' : '2 / 3')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: ${(props) =>
    props.$details ? `1px solid ${props.theme.fifthGray}` : 'none'};
  border-bottom: ${(props) =>
    props.$details ? `1px solid ${props.theme.fifthGray}` : 'none'};
  padding: 1rem;
`;
const Button = styled.button`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  filter: brightness(0) saturate(100%) invert(48%) sepia(4%) saturate(425%)
    hue-rotate(141deg) brightness(95%) contrast(90%);
  font-size: 1.3rem;

  & > img {
    width: 2rem;
  }

  &:nth-child(2) {
    filter: ${(props) =>
      props.$repost
        ? 'brightness(0) saturate(100%) invert(48%) sepia(87%) saturate(1394%) hue-rotate(123deg) brightness(92%) contrast(100%)'
        : 'auto'};
  }

  &:nth-child(3) {
    filter: ${(props) =>
      props.$like
        ? 'brightness(0) saturate(100%) invert(23%) sepia(82%) saturate(4849%) hue-rotate(346deg) brightness(97%) contrast(97%)'
        : 'auto'};
  }

  &:nth-child(4) {
    filter: ${(props) =>
      props.$bookmark
        ? 'brightness(0) saturate(100%) invert(44%) sepia(95%) saturate(1308%) hue-rotate(179deg) brightness(98%) contrast(92%)'
        : 'auto'};
  }

  &:first-child:hover,
  &:nth-child(4):hover {
    filter: brightness(0) saturate(100%) invert(44%) sepia(95%) saturate(1308%)
      hue-rotate(179deg) brightness(98%) contrast(92%);
  }

  &:nth-child(2):hover {
    filter: brightness(0) saturate(100%) invert(48%) sepia(87%) saturate(1394%)
      hue-rotate(123deg) brightness(92%) contrast(100%);
  }

  &:nth-child(3):hover {
    filter: brightness(0) saturate(100%) invert(23%) sepia(82%) saturate(4849%)
      hue-rotate(346deg) brightness(97%) contrast(97%);
  }
`;

export {
  Repost,
  Post,
  Header,
  Settings,
  DeleteButton,
  Content,
  FullDate,
  Buttons,
  Button,
};
