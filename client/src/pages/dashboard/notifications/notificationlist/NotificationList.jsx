import { Link } from 'react-router-dom';
import { Avatar, FollowButton } from '@components';
import PropTypes from 'prop-types';
import { comment, heart, profile, repost } from '@assets/icons';
import * as S from './NotificationList.styles';

function NotificationList({ notifications }) {
  return (
    <S.NotificationList>
      {notifications.map((notification) => {
        const type = notification.notificationType;
        const notifier = notification.notifierUser;
        return (
          <S.Notification.Main key={notification.id}>
            <S.Notification.Header>
              <img
                src={
                  type === 'FOLLOW'
                    ? profile
                    : type === 'COMMENT'
                    ? comment
                    : type === 'LIKE'
                    ? heart
                    : repost
                }
                className={type}
                alt=""
              />
              {type !== 'FOLLOW' && (
                <Link to={`/${notifier.id}`}>
                  <Avatar
                    profile={notifier.profile}
                    width="3.5rem !important"
                  />
                </Link>
              )}
              <div>
                <Link to={`/${notifier.id}`}>
                  {notifier.profile.displayName}
                </Link>{' '}
                {type === 'FOLLOW'
                  ? 'followed you'
                  : type === 'COMMENT'
                  ? 'commented your post'
                  : type === 'LIKE'
                  ? 'liked your post'
                  : 'reposted your post'}
              </div>
            </S.Notification.Header>
            {notification.post ? (
              <S.Notification.Post>
                <Link to={`/posts/${notification.post.id}`}>
                  {notification.post.content && (
                    <div>{notification.post.content}</div>
                  )}
                  {notification.post.file && (
                    <div>{notification.post.file}</div>
                  )}
                </Link>
              </S.Notification.Post>
            ) : (
              <S.Notification.Profile>
                <Link to={`/${notifier.id}`}>
                  <Avatar
                    profile={notifier.profile}
                    width="3.5rem !important"
                  />
                  <FollowButton userId={notifier.id} />
                  <div>{notifier.profile.displayName}</div>
                  <div>{`@${notifier.username}`}</div>
                  <div>{notifier.profile.bio}</div>
                </Link>
              </S.Notification.Profile>
            )}
          </S.Notification.Main>
        );
      })}
    </S.NotificationList>
  );
}

NotificationList.propTypes = {
  notifications: PropTypes.array.isRequired,
};

export default NotificationList;
