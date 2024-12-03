import { useContext } from 'react';
import { Context } from '@context';
import { Avatar } from '@components';
import { Button } from '@components/elements';
import { date } from '@services';
import PropTypes from 'prop-types';
import {
  comment,
  repost,
  emptyHeart,
  heart,
  emptyBookmark,
  bookmark,
} from '@assets/icons';
import * as S from './Post.styles';

function Post({
  post,
  details,
  onReplyClick,
  onRepostClick,
  onLikeClick,
  onBookmarkClick,
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

  return (
    <S.Post>
      <Avatar profile={post.user.profile} />
      <S.Header>
        <div>{post.user.profile.displayName}</div>
        <div>@{post.user.username}</div>
        {!details ? <div>{date.getDate(post.creationDate)}</div> : null}
      </S.Header>
      <S.Content>
        {!!post.content && <div>{post.content}</div>}
        {!!post.file && <img src={post.file} />}
        {!!details && <div>{date.getFullDate(post.creationDate)}</div>}
      </S.Content>
      <S.Buttons>
        <Button onClick={() => onReplyClick(post.id)}>
          <img src={comment} alt="reply" />
          <div>{post.comments.length}</div>
        </Button>
        <Button onClick={() => onRepostClick(post.id)}>
          <img src={repost} alt={hasReposted ? 'undo repost' : 'repost'} />
          <div>
            {post.interactions.filter((i) => i.type === 'REPOST').length}
          </div>
        </Button>
        <Button onClick={() => onLikeClick(post.id)}>
          <img
            src={hasLiked ? heart : emptyHeart}
            alt={hasLiked ? 'unlike' : 'like'}
          />
          <div>{post.interactions.filter((i) => i.type === 'LIKE').length}</div>
        </Button>
        <Button onClick={() => onBookmarkClick(post.id)}>
          <img
            src={hasBookmarked ? bookmark : emptyBookmark}
            alt={hasBookmarked ? 'bookmark' : 'remove from bookmarks'}
          />
          {!!details && (
            <div>
              {post.interactions.filter((i) => i.type === 'BOOKMARK').length}
            </div>
          )}
        </Button>
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
};

export default Post;
