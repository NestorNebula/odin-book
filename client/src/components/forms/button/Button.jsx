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
  padding: 1.5rem 0.75rem;
  border-radius: 5rem;
  font-weight: 700;

  &:hover {
    background-color: ${(props) => props.theme.fourthGray};
  }

  &:disabled {
    background-color: ${(props) => props.theme.thirdGray};
  }
`;

function Button({ children, type, disabled, ...props }) {
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      $color={props.color}
      $backgroundColor={props.backgroundColor}
    >
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default Button;
