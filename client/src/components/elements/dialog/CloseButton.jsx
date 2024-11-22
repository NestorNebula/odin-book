import PropTypes from 'prop-types';
import styled from 'styled-components';
import closeIcon from '@assets/icons/close.svg';

const StyledCloseButton = styled.button``;
const CloseIcon = styled.img``;

function CloseButton({ close }) {
  return (
    <StyledCloseButton onClick={close} aria-label="Close">
      <CloseIcon src={closeIcon} alt="" />
    </StyledCloseButton>
  );
}

CloseButton.propTypes = {
  close: PropTypes.func.isRequired,
};

export default CloseButton;
