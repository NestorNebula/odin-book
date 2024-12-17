import styled from 'styled-components';

const Profile = styled.main`
  display: grid;
  grid-template-columns: 2.5fr 2fr;

  & > aside {
    @media (max-width: 1000px) {
      display: none;
    }
  }
`;
const Title = styled.header`
  padding: 1rem;
  font-size: 2rem;
  font-weight: 800;
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.black};
  z-index: 2;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  border-left: ${(props) => `1px solid ${props.theme.fifthGray}`};
  border-right: ${(props) => `1px solid ${props.theme.fifthGray}`};
  width: clamp(40vw, 600px, 80vw);

  @media (max-width: 500px) {
    width: 100vw;
  }
`;

export { Profile, Title, Content };
