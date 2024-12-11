import styled from 'styled-components';

const SignIn = styled.main`
  height: 100vh;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.secondaryWhite};
  background-color: ${(props) => props.theme.black};
  justify-content: center;
  display: grid;
  align-items: center;
  padding: 2.5rem;

  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const Icon = styled.img`
  max-width: 10rem;

  @media (min-width: 700px) {
    place-self: center;
    display: block;
    max-width: 30vw;
  }
`;
const Section = styled.section`
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;
const SectionHeader = styled.header`
  font-weight: 700;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  & div:first-child {
    font-size: 4rem;
  }

  & div:nth-child(2) {
    font-size: 2.5rem;
  }

  @media (min-width: 700px) {
    & div:first-child {
      font-size: 7rem;
    }

    & div:nth-child(2) {
      font-size: 4rem;
    }
  }
`;
const Methods = styled.div`
  display: grid;
  gap: 1rem;

  & img {
    max-width: 3rem;
  }

  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  & > div:last-child {
  }
`;
const OtherMethods = styled.div`
  display: grid;
  gap: 1rem;

  & > button {
    display: grid;
    text-align: center;
    width: 300px;
  }
`;
const Method = styled.div`
  display: grid;
  text-align: center;
  width: 300px;
`;
const Errors = styled.div`
  position: fixed;
  bottom: 5vh;
  z-index: 2;
  background-color: ${(props) => props.theme.red};
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-self: center;
`;
const DialogHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 7.5%;
  gap: 2rem;
  font-size: 3rem;
  font-weight: 600;

  & > img {
    margin-left: 35%;
    max-width: 5rem;
  }
`;

export {
  SignIn,
  Icon,
  Section,
  SectionHeader,
  Methods,
  OtherMethods,
  Method,
  Errors,
  DialogHeaderContent,
};
