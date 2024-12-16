import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '@context';
import { useDialog, useFile } from '@hooks';
import { Button, Dialog } from '@components/elements';
import { Avatar, FollowButton } from '@components';
import { fetchAPI } from '@services';
import { format } from 'date-fns';
import MessageButton from '../messagebutton/MessageButton';
import ProfileForm from '../profileform/ProfileForm';
import PropTypes from 'prop-types';
import { map, link, calendar } from '@assets/icons';
import { theme } from '@styles';
import * as S from './ProfileHeader.styles';

function ProfileHeader({ user, isUser }) {
  const { updateInformation, updateUser } = useContext(Context);
  const { dialogRef, open, close } = useDialog();
  const [formOpened, setFormOpened] = useState(false);
  const {
    fileUrl: backgroundUrl,
    setFileUrl: setBackgroundUrl,
    updateFile: updateBackground,
    removeFile: removeBackground,
  } = useFile();
  const {
    fileUrl: avatarUrl,
    setFileUrl: setAvatarUrl,
    updateFile: updateAvatar,
    removeFile: removeAvatar,
  } = useFile();

  const submitProfile = async ({ displayName, bio, location, website }) => {
    const fetch = await fetchAPI({
      body: {
        background: backgroundUrl || user.profile.background,
        avatar: avatarUrl || user.profile.avatar,
        displayName,
        bio,
        location,
        website,
      },
      method: 'PUT',
      path: `users/${user.id}/profile`,
    });
    if (fetch.error) {
      updateInformation({
        error: true,
        message: fetch.result.error
          ? fetch.result.error.msg
          : fetch.result.errors[0].msg,
      });
    } else {
      close();
      setFormOpened(false);
      setBackgroundUrl(null);
      setAvatarUrl(null);
      updateInformation({ error: null, message: 'Profile updated.' });
      updateUser();
    }
  };

  const openDialog = () => {
    open();
    setFormOpened(true);
  };

  const closeDialog = () => {
    if (backgroundUrl) removeBackground(user, 'backgrounds');
    if (avatarUrl) removeAvatar(user, 'avatars');
    setFormOpened(false);
    close();
  };

  return (
    <S.ProfileHeader>
      <Dialog.Main dialogRef={dialogRef} close={closeDialog}>
        <Dialog.Header>
          <Dialog.CloseButton close={closeDialog} />
          <div>Edit Profile</div>
        </Dialog.Header>
        {formOpened && isUser ? (
          <ProfileForm
            profile={user.profile}
            onSubmit={submitProfile}
            backgroundFile={{
              url: backgroundUrl,
              update: updateBackground,
              remove: removeBackground,
            }}
            avatarFile={{
              url: avatarUrl,
              update: updateAvatar,
              remove: removeAvatar,
            }}
          />
        ) : (
          <></>
        )}
      </Dialog.Main>
      <S.AvatarContainer>
        <S.Background>
          {user.profile.background ? (
            <img src={user.profile.background} />
          ) : (
            <div></div>
          )}
        </S.Background>
        <Avatar profile={user.profile} />
      </S.AvatarContainer>
      <S.Buttons>
        {isUser ? (
          <Button
            onClick={openDialog}
            color={theme.secondaryWhite}
            backgroundColor={theme.black}
          >
            Edit profile
          </Button>
        ) : (
          <>
            <MessageButton displayedUser={user} />
            <FollowButton userId={user.id} />
          </>
        )}
      </S.Buttons>
      <S.UserInformations>
        <div>{user.profile.displayName}</div>
        <div>@{user.username}</div>
        <div>{user.profile.bio}</div>
      </S.UserInformations>
      <S.UserDetails>
        {user.profile.location && (
          <S.UserDetail>
            <img src={map} alt="" />
            <div>{user.profile.location}</div>
          </S.UserDetail>
        )}
        {user.profile.website && (
          <S.UserDetail>
            <img src={link} alt="" />
            <a href={user.profile.website}>
              {user.profile.website.split('://')[1]}
            </a>
          </S.UserDetail>
        )}
        <S.UserDetail>
          <img src={calendar} />
          <div>Joined {format(user.profile.creationDate, 'MMMM, yyy')}</div>
        </S.UserDetail>
      </S.UserDetails>
      <S.Connections>
        <Link to={`/${user.id}/connections`}>
          <S.Number>{user.following.length}</S.Number> Following
        </Link>
        <Link to={`/${user.id}/connections`}>
          <S.Number>{user.followers.length}</S.Number> Followers
        </Link>
      </S.Connections>
    </S.ProfileHeader>
  );
}

ProfileHeader.propTypes = {
  user: PropTypes.object.isRequired,
  isUser: PropTypes.bool.isRequired,
};

export default ProfileHeader;
