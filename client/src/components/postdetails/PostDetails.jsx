import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '@context';
import { Post, CommentDialog } from '@components';
import { useDialog } from '@hooks';
import { postInteraction } from '@services';
import PropTypes from 'prop-types';
import * as S from './PostDetails.styles';

function PostDetails({ post, update }) {
  const { user, updateInformation } = useContext(Context);

  const [postUrl, setPostUrl] = useState(null);
  const { dialogRef, open, close } = useDialog();
  const [isOpened, setIsOpened] = useState(false);
  const openDialog = () => {
    open();
    setIsOpened(true);
  };
  const closeDialog = () => {
    close();
    setIsOpened(false);
  };

  const structure = postInteraction.createStructure(user.id);
  const onPostClick = async (interaction, postId, postType) => {
    if (interaction === 'COMMENT') {
      if (postType === 'main') {
        return openDialog();
      }
      return setPostUrl(`/posts/${postId}`);
    }
    let postToUpdate = null;
    let actual = post;
    while (!postToUpdate && actual.next) {
      if (actual.main.id === postId) {
        postToUpdate = actual;
      } else {
        actual = actual.next;
      }
    }
    if (!postToUpdate) {
      for (let i = 0; i < post.main.comments.length; i++) {
        if (post.main.comments[i].id === postId) {
          postToUpdate = post.comments[i];
          break;
        }
      }
    }
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

  const getParentPosts = () => {
    const parents = [];
    let actual = post;
    while (actual.next) {
      parents.push(actual.next);
      actual = actual.next;
    }
    return parents;
  };

  return (
    <S.PostDetails>
      {postUrl && <Navigate to={postUrl} />}
      {isOpened ? (
        <CommentDialog
          dialog={{ ref: dialogRef, open: openDialog, close: closeDialog }}
          post={post.main}
          update={update}
        />
      ) : (
        <></>
      )}
      <S.ParentPosts>
        {getParentPosts().map((parent) => (
          <S.ParentPost
            key={parent.id}
            onClick={() => setPostUrl(`/posts/${parent.id}`)}
          >
            <Post
              post={parent}
              onReplyClick={() => onPostClick('COMMENT', parent.id)}
              onRepostClick={() => onPostClick('REPOST', parent.id)}
              onLikeClick={() => onPostClick('LIKE', parent.id)}
              onBookmarkClick={() => onPostClick('BOOKMARK', parent.id)}
            />
          </S.ParentPost>
        ))}
      </S.ParentPosts>
      <Post
        post={post.main}
        details={true}
        onReplyClick={() => onPostClick('COMMENT', post.main.id, 'main')}
        onRepostClick={() => onPostClick('REPOST', post.main.id)}
        onLikeClick={() => onPostClick('LIKE', post.main.id)}
        onBookmarkClick={() => onPostClick('BOOKMARK', post.main.id)}
      />
      <S.Comments>
        {post.main.comments.map((comment) => (
          <S.Comment
            key={comment.id}
            onClick={() => setPostUrl(`/posts/${comment.id}`)}
          >
            <Post
              post={comment}
              onReplyClick={() => onPostClick('COMMENT', comment.id)}
              onRepostClick={() => onPostClick('REPOST', comment.id)}
              onLikeClick={() => onPostClick('LIKE', comment.id)}
              onBookmarkClick={() => onPostClick('BOOKMARK', comment.id)}
            />
          </S.Comment>
        ))}
      </S.Comments>
    </S.PostDetails>
  );
}

PostDetails.propTypes = {
  post: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
};

export default PostDetails;
