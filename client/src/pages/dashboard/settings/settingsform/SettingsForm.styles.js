import styled from 'styled-components';

const SettingsForm = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`;
const Header = styled.header`
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const CloseButton = styled.button`
  padding: 1rem;
  border-radius: 5rem;

  &:hover {
    background-color: ${(props) => props.theme.secondaryBlack};
  }

  & > img {
    filter: brightness(0) saturate(100%) invert(98%) sepia(4%) saturate(2179%)
      hue-rotate(172deg) brightness(110%) contrast(91%);
    width: 2.5rem;
  }

  @media (min-width: 1000px) {
    display: none;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;
const Information = styled.div`
  color: ${(props) => props.theme.secondaryGray};
`;
const Error = styled.div`
  color: ${(props) => props.theme.red};
`;

export { SettingsForm, Header, CloseButton, Form, Information, Error };
