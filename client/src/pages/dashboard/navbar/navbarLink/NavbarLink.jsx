import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledNavbarLinkItem = styled.li``;

function NavbarLink({ link, iconSrc, title }) {
  return (
    <StyledNavbarLinkItem>
      <Link to={`/${link}`} aria-label={`Go to ${title} page.`}>
        <img src={iconSrc} alt="" />
        <div>{title}</div>
      </Link>
    </StyledNavbarLinkItem>
  );
}

NavbarLink.propTypes = {
  link: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default NavbarLink;
