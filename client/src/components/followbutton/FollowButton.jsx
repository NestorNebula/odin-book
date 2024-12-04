import { useContext } from 'react';
import { Context } from '@context';
import { useState } from 'react';
import { fetchAPI } from '@services';
import PropTypes from 'prop-types';
import * as S from './FollowButton.styles';

function FollowButton({ userId }) {
  const { user, updateUser } = useContext(Context);
  const isFollowed = user.following.some((u) => u.id === userId);
  const [isHovered, setHovered] = useState(false);

  const followUser = async () => {
    return await fetchAPI({
      body: { userId },
      method: 'POST',
      path: `users/${user.id}/following`,
    });
  };

  const unfollowUser = async () => {
    return await fetchAPI({
      body: { userId },
      method: 'DELETE',
      path: `users/${user.id}/following`,
    });
  };

  return (
    <>
      {isFollowed ? (
        isHovered ? (
          <S.UnfollowButton
            onClick={async () => {
              const fetch = await unfollowUser();
              if (!fetch.error) updateUser();
            }}
            onMouseLeave={() => setHovered(false)}
          >
            Unfollow
          </S.UnfollowButton>
        ) : (
          <S.FollowingButton onMouseOver={() => setHovered(true)}>
            Following
          </S.FollowingButton>
        )
      ) : (
        <S.FollowButton
          onClick={async () => {
            const fetch = await followUser();
            if (!fetch.error) updateUser();
          }}
        >
          Follow
        </S.FollowButton>
      )}
    </>
  );
}

FollowButton.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default FollowButton;
