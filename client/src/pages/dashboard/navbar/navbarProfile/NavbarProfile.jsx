import { Link } from 'react-router-dom';
import { Avatar } from '@components';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledNavbarProfile = styled.li``;

function NavbarProfile({ username, profile }) {
  return (
    <StyledNavbarProfile>
      <Link to={`/${profile.userId}`} aria-label="Open profile page.">
        <Avatar profile={profile} />
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
