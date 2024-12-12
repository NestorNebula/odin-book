import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledNavbarLinkItem = styled.li`
  font-weight: 500;
  border-radius: 5rem;
  padding: 1rem;
  width: fit-content;

  &:hover {
    background-color: ${(props) => props.theme.secondaryBlack};
  }

  & > a {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    & > div:last-child {
      text-transform: capitalize;

      @media (max-width: 1000px) {
        display: none;
      }
    }
  }
`;
const StyledNavbarIcon = styled.div`
  & > img {
    width: 3rem;
    filter: invert();
  }

  & > div {
    background-color: ${(props) => props.theme.mainBlue};
    width: 1rem;
    border-radius: 1rem;
  }
`;

function NavbarLink({ link, iconSrc, title = link, notificationsNum }) {
  return (
    <StyledNavbarLinkItem>
      <Link to={`/${link}`} aria-label={`Go to ${title} page.`}>
        <StyledNavbarIcon>
          <img src={iconSrc} alt="" />
          {notificationsNum && (
            <div aria-label={`${notificationsNum} notifications`}>
              {notificationsNum}
            </div>
          )}
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
