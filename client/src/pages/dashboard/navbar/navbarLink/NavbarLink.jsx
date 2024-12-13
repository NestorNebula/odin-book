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

      @media (max-width: 1200px) {
        display: none;
      }
    }
  }
`;
const StyledNavbarIcon = styled.div`
  position: relative;

  & > img {
    width: 3rem;
    filter: invert();
  }

  & > div {
    --size: 2rem;
    position: absolute;
    top: -0.5rem;
    left: 1.75rem;
    display: grid;
    place-content: center;
    background-color: ${(props) => props.theme.mainBlue};
    height: var(--size);
    width: var(--size);
    border-radius: var(--size);
    font-size: 1.25rem;
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
