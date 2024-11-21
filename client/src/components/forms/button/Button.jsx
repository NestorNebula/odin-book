import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button``;

function Button({ content, type }) {
  return <StyledButton type={type}>{content}</StyledButton>;
}

Button.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Button;
