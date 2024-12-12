import styled from 'styled-components';

const Container = styled.div``;
const TextArea = styled.textarea`
  border: none;
  outline: none;
  resize: none;
  width: 100%;
`;
const MaxLength = styled.div``;
const Error = styled.div`
  background-color: ${(props) => props.theme.red};
  padding: 0.25rem;
`;

export { Container, TextArea, MaxLength, Error };
