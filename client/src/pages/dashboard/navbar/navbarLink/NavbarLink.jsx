import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledNavbarLinkItem = styled.li``;
const StyledNavbarIcon = styled.div``;

function NavbarLink({ link, iconSrc, title = link, notificationsNum }) {
  return (
    <StyledNavbarLinkItem>
      <Link to={`/${link}`} aria-label={`Go to ${title} page.`}>
        <StyledNavbarIcon>
          <img src={iconSrc} alt="" />
          <div aria-label={`${notificationsNum} notifications`}>
            {notificationsNum}
          </div>
        </StyledNavbarIcon>
        <div>{title}</div>
      </Link>
    </StyledNavbarLinkItem>
  );
}

NavbarLink.propTypes = {
  link: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
  title: PropTypes.string,
  notificationsNum: PropTypes.number,
};

export default NavbarLink;
