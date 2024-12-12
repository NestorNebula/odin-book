import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '@context';
import { Post } from '@components';
import { deletePost, postInteraction } from '@services';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledBookmarkList = styled.div``;

function BookmarkList({ bookmarks, onBookmarkClick, update }) {
  const { user, updateInformation } = useContext(Context);
  const [postLink, setPostLink] = useState(null);

  const structure = postInteraction.createStructure(user.id);

  const onPostClick = async (interaction, postId) => {
    if (interaction === 'COMMENT') {
      return setPostLink(`/posts/${postId}`);
    }
    const postToUpdate = bookmarks.find(
      (bookmark) => bookmark.postId === postId
    ).post;
    if (!postToUpdate) return;
    const result = await postInteraction.interact({
      structure,
      interaction,
      postId,
      remove: postToUpdate.interactions.some(
        (i) => i.type === interaction && i.userId === user.id
      ),
    });
    if (!result.success) {
      updateInformation({ error: true, message: result.msg });
    } else {
      updateInformation({ error: null, message: result.msg });
      update();
    }
  };

  const onPostDelete = async (postId) => {
    const fetch = await deletePost(postId, user.id);
    if (fetch.error) {
      updateInformation({ error: true, message: fetch.result.error.msg });
    } else {
      updateInformation({ error: null, message: 'Post deleted.' });
      update();
    }
  };

  return (
    <StyledBookmarkList>
      {postLink && <Navigate to={postLink} />}
      {bookmarks.map((bookmark) => (
        <div
          key={`${bookmark.type}${bookmark.postId}${bookmark.userId}`}
          onClick={() => onBookmarkClick(bookmark.postId)}
        >
          <Post
            post={bookmark.post}
            onReplyClick={() => onPostClick('COMMENT', bookmark.postId)}
            onRepostClick={() => onPostClick('REPOST', bookmark.postId)}
            onLikeClick={() => onPostClick('LIKE', bookmark.postId)}
            onBookmarkClick={() => onPostClick('COMMENT', bookmark.postId)}
            onPostDelete={() => onPostDelete(bookmark.postId)}
          />
        </div>
      ))}
    </StyledBookmarkList>
  );
}

BookmarkList.propTypes = {
  bookmarks: PropTypes.array.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

export default BookmarkList;
