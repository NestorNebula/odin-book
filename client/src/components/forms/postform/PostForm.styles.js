import styled from 'styled-components';

const PostForm = styled.form`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem 1rem;
  width: clamp(40vw, 600px, 80vw);
  padding: 0.5rem 1rem;
  & textarea {
    font-size: 2rem;
    margin-top: 0.8rem;
  }

  & > button {
    justify-self: end;
    padding: 1rem 2rem;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;
const Content = styled.div`
  grid-column: 2 / 3;
`;
const FileContainer = styled.div`
  position: relative;

  & > button {
    position: absolute;
    top: 1rem;
    right: 1rem;

    & > img {
      width: 2.5rem;
      filter: invert();
    }
  }
`;
const File = styled.img`
  max-width: 100%;
  border-radius: 15px;
`;
const Error = styled.div`
  grid-column: 1 / 3;
  background-color: ${(props) => props.theme.red};
  padding: 0.25rem;
`;
export { PostForm, Content, FileContainer, File, Error };
