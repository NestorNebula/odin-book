import { useContext, useEffect, useState } from 'react';
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
import { theme } from '@styles';
import * as S from './Post.styles';

function Post({
  post,
  details,
  onReplyClick,
  onRepostClick,
  onLikeClick,
  onBookmarkClick,
  onPostDelete,
  noPostLink,
  ...props
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
  useEffect(() => {
    const handleEscapeClick = (e) => {
      if (e.code === 'Escape') setSettingsOpen(false);
    };
    const handleClick = () => setSettingsOpen(false);
    window.addEventListener('keydown', handleEscapeClick);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleEscapeClick);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <S.Post $details={details} $parent={props.parent} $main={props.main}>
      {post.type === 'COMMENT' &&
        post.commentedPost &&
        !props.main &&
        !props.parent && (
          <S.Repost>
            Replying to{' '}
            <Link to={`/posts/${post.commentedPost.id}`}>
              @{post.commentedPost.user.username}
            </Link>
          </S.Repost>
        )}
      <Link to={`/${post.userId}`} ref={props.parentRef || props.mainRef}>
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
              <S.DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  onPostDelete(post.id);
                }}
                aria-label="delete post"
              >
                <img src={trash} alt="" />
              </S.DeleteButton>
            )}
          </S.Settings>
        )}
      </S.Header>
      <S.Content $details={details}>
        {noPostLink ? (
          <S.PostContent>
            {' '}
            {!!post.content && <div>{post.content}</div>}
            {!!post.file && <img src={post.file} alt="" />}
          </S.PostContent>
        ) : (
          <Link to={`/posts/${post.id}`}>
            {!!post.content && <div>{post.content}</div>}
            {!!post.file && <img src={post.file} />}
          </Link>
        )}
        {!!details && (
          <S.FullDate>{date.getFullDate(post.creationDate)}</S.FullDate>
        )}
      </S.Content>
      <S.Buttons $details={details}>
        <S.Button
          onClick={(e) => {
            e.stopPropagation();
            onReplyClick(post.id);
          }}
        >
          <img src={comment} alt="reply" />
          <div>{post.comments.length}</div>
        </S.Button>
        <S.Button
          onClick={(e) => {
            e.stopPropagation();
            onRepostClick(post.id);
          }}
          $repost={hasReposted}
        >
          <img src={repost} alt={hasReposted ? 'undo repost' : 'repost'} />
          <div>
            {post.interactions.filter((i) => i.type === 'REPOST').length}
          </div>
        </S.Button>
        <S.Button
          onClick={(e) => {
            e.stopPropagation();
            onLikeClick(post.id);
          }}
          $like={hasLiked}
        >
          <img
            src={hasLiked ? heart : emptyHeart}
            alt={hasLiked ? 'unlike' : 'like'}
          />
          <div>{post.interactions.filter((i) => i.type === 'LIKE').length}</div>
        </S.Button>
        <S.Button
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkClick(post.id);
          }}
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
      {props.parent && props.lineHeight && (
        <S.Svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          height={props.lineHeight}
          $marginLeft="3.2rem"
        >
          <line
            x1="0"
            y1={window.innerWidth > 1000 ? '10' : '0'}
            x2="0"
            y2={props.lineHeight}
            stroke={theme.fifthGray}
            strokeWidth="3"
          />
        </S.Svg>
      )}
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
  noPostLink: PropTypes.bool,
  parent: PropTypes.bool,
  main: PropTypes.bool,
  parentRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  mainRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  lineHeight: PropTypes.number,
};

export default Post;
