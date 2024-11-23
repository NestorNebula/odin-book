import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDialog = styled.dialog``;

function Dialog({ children, dialogRef }) {
  return <StyledDialog ref={dialogRef}>{children}</StyledDialog>;
}

Dialog.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  dialogRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default Dialog;
