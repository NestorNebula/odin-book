import { useContext, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '@context';
import { Button } from '@components/elements';
import NavbarLink from './navbarLink/NavbarLink';
import NavbarProfile from './navbarProfile/NavbarProfile';
import PropTypes from 'prop-types';
import * as icons from '@assets/icons';
import * as S from './Navbar.styles';

function Navbar({ openNewPost }) {
  const { user } = useContext(Context);
  const { pathname } = useLocation();

  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const updateWidth = () => {
      setWidth(document.documentElement.clientWidth);
    };

    window.addEventListener('resize', updateWidth);
    updateWidth();

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <S.Navbar>
      <ul>
        <S.LogoItem>
          <img src={icons.icon} alt="Odin-Book" />
        </S.LogoItem>
        <S.Links>
          <ul>
            <NavbarLink
              link="home"
              iconSrc={pathname === '/home' ? icons.fullHome : icons.home}
              active={pathname === '/home'}
            />
            <NavbarLink
              link="explore"
              iconSrc={icons.explore}
              active={pathname === '/explore'}
            />
            <NavbarLink
              link="notifications"
              iconSrc={
                pathname === '/notifications'
                  ? icons.fullNotifications
                  : icons.notification
              }
              notificationsNum={user.notifications.reduce(
                (num, notification) =>
                  notification.seen ? num : num === null ? 1 : ++num,
                null
              )}
              active={pathname === '/notifications'}
            />
            <NavbarLink
              link="messages"
              iconSrc={
                pathname === '/messages' ? icons.fullMessage : icons.message
              }
              active={pathname === '/messages'}
            />
            <NavbarLink
              link="bookmarks"
              iconSrc={
                pathname === '/bookmarks' ? icons.bookmark : icons.emptyBookmark
              }
              active={pathname === '/bookmarks'}
            />
            {!!user.id && (
              <NavbarLink
                link={`${user.id}`}
                iconSrc={
                  Number.isInteger(+pathname.split('/')[1])
                    ? icons.profile
                    : icons.emptyProfile
                }
                title="profile"
                active={Number.isInteger(+pathname.split('/')[1])}
              />
            )}
            <NavbarLink
              link="settings"
              iconSrc={icons.settings}
              active={pathname === '/settings'}
            />
          </ul>
        </S.Links>
        <li>
          <Button onClick={openNewPost}>
            {width >= 1275 ? (
              'Post'
            ) : (
              <S.PostIcon src={icons.write} alt="new post" />
            )}
          </Button>
        </li>
        <NavbarProfile username={user.username} profile={user.profile} />
      </ul>
    </S.Navbar>
  );
}

Navbar.propTypes = {
  openNewPost: PropTypes.func.isRequired,
};

export default Navbar;
