import { useContext, useState } from 'react';
import { Context } from '@context';
import { Link } from 'react-router-dom';
import { Avatar } from '@components';
import { date } from '@services';
import PropTypes from 'prop-types';
import {
  comment,
  repost,
  emptyHeart,
  heart,
  emptyBookmark,
  bookmark,
  settings,
  trash,
} from '@assets/icons';
import * as S from './Post.styles';

function Post({
  post,
  details,
  onReplyClick,
  onRepostClick,
  onLikeClick,
  onBookmarkClick,
  onPostDelete,
}) {
  const { user } = useContext(Context);
  const hasReposted = !!post.interactions.find(
    (i) => i.type === 'REPOST' && i.userId === user.id
  );
  const hasLiked = !!post.interactions.find(
    (i) => i.type === 'LIKE' && i.userId === user.id
  );
  const hasBookmarked = !!post.interactions.find(
    (i) => i.type === 'BOOKMARK' && i.userId === user.id
  );

  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <S.Post $details={details}>
      {post.type === 'COMMENT' && post.commentedPost && (
        <S.Repost>
          Replying to{' '}
          <Link to={`/posts/${post.commentedPost.id}`}>
            @{post.commentedPost.user.username}
          </Link>
        </S.Repost>
      )}
      <Link to={`/${post.userId}`}>
        <Avatar profile={post.user.profile} />
      </Link>
      <S.Header $details={details}>
        <div>{post.user.profile.displayName}</div>
        <div>@{post.user.username}</div>
        {!details ? <div>・{date.getDate(post.creationDate)}</div> : null}
        {user.id === post.userId && onPostDelete && (
          <S.Settings>
            <button
              aria-label="open settings"
              onClick={(e) => {
                e.stopPropagation();
                setSettingsOpen(!settingsOpen);
              }}
            >
              <img src={settings} alt="" />
            </button>
            {settingsOpen && (
              <S.DeleteButton onClick={() => onPostDelete(post.id)}>
                <img src={trash} alt="" />
                <div>Delete</div>
              </S.DeleteButton>
            )}
          </S.Settings>
        )}
      </S.Header>
      <S.Content $details={details}>
        <Link to={`/posts/${post.id}`}>
          {!!post.content && <div>{post.content}</div>}
          {!!post.file && <img src={post.file} />}
        </Link>
        {!!details && (
          <S.FullDate>{date.getFullDate(post.creationDate)}</S.FullDate>
        )}
      </S.Content>
      <S.Buttons $details={details}>
        <S.Button onClick={() => onReplyClick(post.id)}>
          <img src={comment} alt="reply" />
          <div>{post.comments.length}</div>
        </S.Button>
        <S.Button onClick={() => onRepostClick(post.id)} $repost={hasReposted}>
          <img src={repost} alt={hasReposted ? 'undo repost' : 'repost'} />
          <div>
            {post.interactions.filter((i) => i.type === 'REPOST').length}
          </div>
        </S.Button>
        <S.Button onClick={() => onLikeClick(post.id)} $like={hasLiked}>
          <img
            src={hasLiked ? heart : emptyHeart}
            alt={hasLiked ? 'unlike' : 'like'}
          />
          <div>{post.interactions.filter((i) => i.type === 'LIKE').length}</div>
        </S.Button>
        <S.Button
          onClick={() => onBookmarkClick(post.id)}
          $bookmark={hasBookmarked}
        >
          <img
            src={hasBookmarked ? bookmark : emptyBookmark}
            alt={hasBookmarked ? 'bookmark' : 'remove from bookmarks'}
          />
          {!!details && (
            <div>
              {post.interactions.filter((i) => i.type === 'BOOKMARK').length}
            </div>
          )}
        </S.Button>
      </S.Buttons>
    </S.Post>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  details: PropTypes.bool,
  onReplyClick: PropTypes.func.isRequired,
  onRepostClick: PropTypes.func.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  onPostDelete: PropTypes.func.isRequired,
};

export default Post;
