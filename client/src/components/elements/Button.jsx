import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) =>
    props.$backgroundColor ?? props.theme.mainWhite};
  color: ${(props) => props.$color ?? props.theme.black};
  border: ${(props) =>
    props.$backgroundColor === props.theme.black
      ? `1px solid ${props.theme.secondaryGray}`
      : null};
  padding: 0.75rem;
  border-radius: 5rem;
  font-weight: 700;

  &:hover {
    background-color: ${(props) =>
      props.$noHover ? 'auto' : props.theme.fourthGray};
  }

  &:disabled {
    background-color: ${(props) => props.theme.thirdGray};
  }
`;

function Button({ children, onClick, ...props }) {
  return (
    <StyledButton
      type="button"
      onClick={onClick}
      $backgroundColor={props.backgroundColor}
      $color={props.color}
      $noHover={props.noHover}
      disabled={props.disabled}
    >
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onClick: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  noHover: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
