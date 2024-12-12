import PropTypes from 'prop-types';
import * as S from './NavbarButton.styles';

function NavbarButton({ children, onClick, ...props }) {
  return (
    <S.NavbarButton onClick={onClick} $selected={props.selected}>
      <div>{children}</div>
    </S.NavbarButton>
  );
}

NavbarButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

export default NavbarButton;
