import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledError = styled.div`
  place-self: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 2rem;
  padding: 1rem;

  & > a {
    color: ${(props) => props.theme.mainBlue};

    &:hover {
      text-decoration: underline;
    }
  }
`;
const StyledStatus = styled.div`
  font-style: italic;
  color: ${(props) => props.main.secondaryGray};
`;
const StyledErrorContent = styled.div`
  font-size: 2.5rem;
  color: ${(props) => props.theme.secondaryWhite};
`;

function Error({ children, status, provideRedirect }) {
  return (
    <StyledError>
      {status && <StyledStatus>{status}</StyledStatus>}
      <StyledErrorContent>{children}</StyledErrorContent>
      {provideRedirect && <Link to="/">Return to Homepage.</Link>}
    </StyledError>
  );
}

Error.propTypes = {
  children: PropTypes.string.isRequired,
  status: PropTypes.number,
  provideRedirect: PropTypes.bool,
};

export default Error;
