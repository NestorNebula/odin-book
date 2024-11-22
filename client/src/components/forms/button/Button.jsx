import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button``;

function Button({ children, type }) {
  return <StyledButton type={type}>{children}</StyledButton>;
}

Button.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default Button;
