import { useContext, useState } from 'react';
import { Context } from '@context';
import { useParams, Navigate } from 'react-router-dom';
import { useData, usePosts } from '@hooks';
import { DefaultSidebar, Error, Loading } from '@components';
import ProfileHeader from './profileheader/ProfileHeader';
import ProfileContent from './profilecontent/ProfileContent';
import * as S from './Profile.styles';

function Profile() {
  const { user } = useContext(Context);
  const { userId } = useParams();
  const isUser = user.id === +userId;

  const { data, error, loading } = useData({
    path: `users/${userId}`,
    dependencies: [user, userId],
  });
  const { posts, reposts, updatePost, updateRepost, updateAllPosts } = usePosts(
    {
      postsPath: `users/${userId}/posts`,
      fetchReposts: true,
    }
  );
  const [updateLikes, setUpdateLikes] = useState(false);
  const doUpdateLikes = () => setUpdateLikes(!updateLikes);
  const { data: likesData } = useData({
    path: `users/${user.id}/interactions?type=LIKE`,
    dependencies: [updateLikes],
  });

  return (
    <S.Profile>
      <title>
        {data && data.user
          ? `${data.user.profile.displayName} (@${data.user.username}) / Odin-Book`
          : 'Profile / Odin-Book'}
      </title>
      {(!+userId || isNaN(+userId) || (data && !data.user)) && (
        <Navigate to="/home" />
      )}
      <S.Content>
        {data && <S.Title>{data.user.profile.displayName}</S.Title>}
        {error ? (
          <Error>{error}</Error>
        ) : loading ? (
          <Loading data="profile" />
        ) : (
          <ProfileHeader user={data.user} isUser={isUser} />
        )}
        <ProfileContent
          content={{
            posts,
            reposts,
            likes: likesData ? likesData.interactions : [],
          }}
          update={{
            post: updatePost,
            repost: updateRepost,
            likes: doUpdateLikes,
            all: updateAllPosts,
          }}
          isUser={isUser}
        />
      </S.Content>
      <DefaultSidebar />
    </S.Profile>
  );
}

export default Profile;
