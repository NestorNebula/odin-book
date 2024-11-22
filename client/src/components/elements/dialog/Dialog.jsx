import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDialog = styled.dialog``;

function Dialog({ children, ref }) {
  return <StyledDialog ref={ref}>{children}</StyledDialog>;
}

Dialog.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  ref: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default Dialog;
