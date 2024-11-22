import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDialogHeader = styled.header``;

function DialogHeader({ children }) {
  return <StyledDialogHeader>{children}</StyledDialogHeader>;
}

DialogHeader.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

export default DialogHeader;
