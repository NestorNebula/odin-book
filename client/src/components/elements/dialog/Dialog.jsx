import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDialog = styled.dialog`
  border-radius: 10px;
  padding: 0.75rem;

  &::backdrop {
    background-color: ${(props) => props.theme.mainBlue};
    opacity: 0.15;
  }
`;

function Dialog({ children, dialogRef, close }) {
  return (
    <StyledDialog
      ref={dialogRef}
      onCancel={(e) => {
        if (e.target.nodeName === 'DIALOG') {
          close();
        }
      }}
    >
      {children}
    </StyledDialog>
  );
}

Dialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  dialogRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  close: PropTypes.func.isRequired,
};

export default Dialog;
