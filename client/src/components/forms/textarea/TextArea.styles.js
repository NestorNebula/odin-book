import styled from 'styled-components';

const Container = styled.div`
  position: relative;

  & > label {
    position: absolute;
    left: 1rem;
    top: 1rem;
    color: ${(props) => props.theme.thirdGray};
    text-transform: capitalize;
    transition: top 0.25s ease-out, left 0.25s ease-out,
      font-size 0.25s ease-out;
    padding: 0.5rem;
  }
`;
const TextArea = styled.textarea`
  border: none;
  outline: none;
  resize: none;
  width: 100%;

  &:focus + label {
    color: ${(props) => props.theme.mainBlue};
    top: 0rem;
    left: 0.5rem;
    font-size: 1.25rem;
  }
`;
const MaxLength = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  color: ${(props) => props.theme.thirdGray};
  font-size: 1.3rem;
`;
const Error = styled.div`
  background-color: ${(props) => props.theme.red};
  padding: 0.25rem;
`;

export { Container, TextArea, MaxLength, Error };
