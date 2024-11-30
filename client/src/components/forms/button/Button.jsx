import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button``;

function Button({ children, type, disabled }) {
  return (
    <StyledButton type={type} disabled={disabled}>
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
