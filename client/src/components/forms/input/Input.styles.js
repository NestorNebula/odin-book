import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;
const Input = styled.input`
  border: ${(props) =>
    props.$invalid
      ? `2px solid ${props.theme.red}`
      : `1px solid ${props.theme.thirdGray}`};
  border-radius: 5px;
  padding: 2.25rem 1rem 0.75rem;
  width: 100%;

  &:focus {
    border: ${(props) =>
      props.$invalid
        ? `2px solid ${props.theme.red}`
        : `2px solid ${props.theme.mainBlue}`};
    outline: none;

    & + label {
      color: ${(props) =>
        props.$invalid ? props.theme.red : props.theme.mainBlue};
      top: 0rem;
      left: 0.5rem;
      font-size: 1.25rem;
    }
  }

  &:not(:placeholder-shown) + label {
    top: 0rem;
    left: 0.5rem;
    font-size: 1.25rem;
  }
`;
const Label = styled.label`
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: ${(props) => props.theme.thirdGray};
  text-transform: capitalize;
  transition: top 0.25s ease-out, left 0.25s ease-out, font-size 0.25s ease-out;
  padding: 0.5rem;
`;
const DivMaxLength = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  color: ${(props) => props.theme.thirdGray};
  font-size: 1.3rem;
`;
const Error = styled.div`
  color: ${(props) => props.theme.red};
  font-size: 1.3rem;
`;

export { Container, Input, Label, DivMaxLength, Error };
