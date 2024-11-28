import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledError = styled.div``;

function Error({ children, status, provideRedirect }) {
  return (
    <StyledError>
      {status && <div>{status}</div>}
      <div>{children}</div>
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
