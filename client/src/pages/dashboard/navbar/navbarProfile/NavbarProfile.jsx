import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import defaultIcon from '@assets/icons/avatar.png';
import styled from 'styled-components';

const StyledNavbarProfile = styled.li``;

function NavbarProfile({ username, profile }) {
  return (
    <StyledNavbarProfile>
      <Link to="/profile" aria-label="Open profile page.">
        <img src={profile.avatar ?? defaultIcon} alt="" />
        <div>{profile.displayName}</div>
        <div>{`@${username}`}</div>
      </Link>
    </StyledNavbarProfile>
  );
}

NavbarProfile.propTypes = {
  username: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
};

export default NavbarProfile;
