import { Link } from 'react-router-dom';
import { Avatar } from '@components';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledNavbarProfile = styled.li`
  margin-top: auto;
  font-size: 1.5rem;

  & > a {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.25rem 1rem;
    padding: 1rem;
    border-radius: 5rem;
    & > img {
      grid-row: 1 / 3;
    }

    & > div:nth-child(2) {
      font-weight: 700;
    }

    &:hover {
      background-color: ${(props) => props.theme.secondaryBlack};
    }

    @media (max-width: 1275px) {
      & > div {
        display: none;
      }
    }
  }
`;

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
