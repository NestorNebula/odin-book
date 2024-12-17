import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  & > label,
  & > input {
    display: ${(props) => props.$hidden && 'none'};
  }
`;
const Label = styled.label`
  filter: brightness(0) saturate(100%) invert(61%) sepia(55%) saturate(5111%)
    hue-rotate(179deg) brightness(97%) contrast(93%);
  & > img {
    width: 2.5rem;
  }
  align-self: center;
`;
const Input = styled.input`
  display: none;
`;

export { Container, Label, Input };
