import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button``;

function Button({ children, onClick }) {
  return (
    <StyledButton type="button" onClick={onClick}>
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.oneOf([PropTypes.string, PropTypes.node]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
