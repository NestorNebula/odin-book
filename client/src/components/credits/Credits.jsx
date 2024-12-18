import styled from 'styled-components';
import { github } from '@assets/icons';

const StyledCredits = styled.div`
  position: sticky;
  top: 90vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  border: none !important;
  font-size: 1rem;

  & > div:last-child {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    & img {
      width: 2rem;
      filter: invert();
    }
  }
`;

function Credits() {
  return (
    <StyledCredits>
      <div>
        <a href="https://www.flaticon.com/free-icons/user" title="user icons">
          User icons created by Saepul Nahwan - Flaticon
        </a>
      </div>
      <div>
        © Noa Houssier{' '}
        <a
          href="https://github.com/NestorNebula"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={github} alt="GitHub" />
        </a>{' '}
        2024
      </div>
    </StyledCredits>
  );
}

export default Credits;
