import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDialogHeader = styled.header`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: start;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
`;

function DialogHeader({ children }) {
  return <StyledDialogHeader>{children}</StyledDialogHeader>;
}

DialogHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default DialogHeader;
