import { useContext } from 'react';
import { Context } from '@context';
import { Button } from '@components/elements';
import NavbarLink from './navbarLink/NavbarLink';
import NavbarProfile from './navbarProfile/NavbarProfile';
import PropTypes from 'prop-types';
import * as icons from '@assets/icons';
import * as S from './Navbar.styles';

function Navbar({ openNewPost }) {
  const { user } = useContext(Context);

  return (
    <S.Navbar>
      <ul>
        <S.LogoItem>
          <img src={icons.icon} alt="Odin-Book" />
        </S.LogoItem>
        <NavbarLink link="home" iconSrc={icons.home} />
        <NavbarLink link="explore" iconSrc={icons.explore} />
        <NavbarLink
          link="notifications"
          iconSrc={icons.notification}
          notificationsNum={user.notifications.reduce(
            (num, notification) =>
              notification.seen ? num : num === null ? 1 : ++num,
            null
          )}
        />
        <NavbarLink link="messages" iconSrc={icons.message} />
        <NavbarLink link="bookmarks" iconSrc={icons.bookmark} />
        <NavbarLink
          link={user.loginMethod !== 'GUEST' ? `${user.id}` : 'guest'}
          iconSrc={icons.profile}
          title="profile"
        />
        <NavbarLink link="settings" iconSrc={icons.settings} />
        <Button onClick={openNewPost}>Post</Button>
        <NavbarProfile username={user.username} profile={user.profile} />
      </ul>
    </S.Navbar>
  );
}

Navbar.propTypes = {
  openNewPost: PropTypes.func.isRequired,
};

export default Navbar;
