import styled from 'styled-components';

const NavbarButton = styled.button`
  width: 100%;
  background-color: inherit;
  padding: 2rem 0;

  &:hover {
    background-color: ${(props) => props.theme.secondaryBlack};
  }

  & > div {
    position: relative;
    color: ${(props) =>
      props.$selected ? props.theme.secondaryWhite : props.theme.secondaryGray};
    font-size: 1.5rem;
    font-weight: 700;
    width: fit-content;
    justify-self: center;

    &::after {
      position: absolute;
      ${(props) => props.$selected && "content: ''"};
      background-color: ${(props) => props.theme.mainBlue};
      height: 0.4rem;
      border-radius: 0.4rem;
      width: 100%;
      left: 0;
      top: 3.5rem;
    }
  }
`;

export { NavbarButton };
