import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSubmitButton = styled.button``;

function SubmitButton({ content }) {
  return <StyledSubmitButton>{content}</StyledSubmitButton>;
}

SubmitButton.propTypes = {
  content: PropTypes.string.isRequired,
};

export default SubmitButton;
