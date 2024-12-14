import styled from 'styled-components';

const Notifications = styled.main`
  display: grid;
  grid-template-columns: 2.5fr 2fr;
`;
const Content = styled.div`
  border-left: ${(props) => `1px solid ${props.theme.fifthGray}`};
  border-right: ${(props) => `1px solid ${props.theme.fifthGray}`};
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const Header = styled.header`
  font-size: 2.25rem;
  font-weight: 700;
  padding: 1rem;
`;

export { Notifications, Content, Header };
