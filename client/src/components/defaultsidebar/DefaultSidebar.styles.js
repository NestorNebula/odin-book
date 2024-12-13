import styled from 'styled-components';

const Sidebar = styled.aside`
  padding: 0.25rem 3rem;
  width: min(400px, 100%);
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & > div {
    border: ${(props) => `1px solid ${props.theme.fifthGray}`};
  }
`;

export { Sidebar };
