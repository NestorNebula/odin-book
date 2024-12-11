import PropTypes from 'prop-types';
import styled from 'styled-components';
import closeIcon from '@assets/icons/close.svg';

const StyledCloseButton = styled.button`
  background-color: inherit;
`;
const CloseIcon = styled.img`
  width: 2.5rem;
  filter: invert();
`;

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
