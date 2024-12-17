import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '@context';
import { Post, CommentDialog } from '@components';
import { PostForm } from '@components/forms';
import { useDialog, useFile } from '@hooks';
import { deletePost, fetchAPI, postInteraction } from '@services';
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

  const { fileUrl, setFileUrl, error, updateFile, removeFile } = useFile();

  const submitComment = async ({ content, file }) => {
    const fetch = await fetchAPI({
      body: { content, file, postId: post.main.id },
      method: 'POST',
      path: `users/${user.id}/posts`,
    });
    if (fetch.error) {
      updateInformation({
        error: true,
        message: fetch.result.error
          ? fetch.result.error.msg
          : fetch.result.errors[0].msg,
      });
    } else {
      updateInformation({ error: null, message: 'Comment created.' });
      setFileUrl(null);
      update();
    }
  };

  const structure = postInteraction.createStructure(user.id);
  const onPostClick = async (interaction, postId, postType) => {
    if (interaction === 'COMMENT') {
      if (postType === 'main') {
        return openDialog();
      }
      return setPostUrl(`/posts/${postId}`);
    }
    let postToUpdate = postId === post.main.id ? post.main : null;
    let actual = post;
    while (!postToUpdate && actual) {
      if (actual.main.id === postId) {
        postToUpdate = actual.main;
      } else {
        actual = actual.next ? actual.next : null;
      }
    }
    if (!postToUpdate) {
      for (let i = 0; i < post.main.comments.length; i++) {
        if (post.main.comments[i].id === postId) {
          postToUpdate = post.main.comments[i];
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

  const onPostDelete = async (postId, isMainPost) => {
    const fetch = await deletePost(postId, user.id);
    if (fetch.error) {
      updateInformation({ error: true, message: fetch.result.error.msg });
    } else {
      updateInformation({ error: null, message: 'Post deleted.' });
      isMainPost ? setPostUrl('/home') : update();
    }
  };

  const getParentPosts = () => {
    const parents = [];
    let actual = post;
    while (actual.next) {
      parents.push(actual.next);
      actual = actual.next;
    }
    parents.reverse();
    return parents;
  };
  const parentPosts = getParentPosts();

  const parentRef = useRef();
  const mainRef = useRef();
  const [lineHeight, setLineHeight] = useState(0);
  useLayoutEffect(() => {
    const updateLineHeight = () => {
      setLineHeight(
        !mainRef.current || !parentRef.current
          ? 0
          : mainRef.current.getBoundingClientRect().y -
              parentRef.current.getBoundingClientRect().y
      );
    };
    updateLineHeight();

    window.addEventListener('resize', updateLineHeight);
    const interval = setInterval(() => {
      if (lineHeight || !parentPosts.length) clearInterval(interval);
      updateLineHeight();
    }, 1000);

    return () => {
      window.removeEventListener('resize', updateLineHeight);
      clearInterval(interval);
    };
  }, [lineHeight, parentPosts]);

  return (
    <S.PostDetails>
      {postUrl && <Navigate to={postUrl} />}
      <CommentDialog
        dialog={{ ref: dialogRef, open: openDialog, close: closeDialog }}
        post={isOpened ? post.main : null}
        update={update}
      />
      <S.ParentPosts>
        {parentPosts.map((parent, index) => (
          <S.ParentPost
            key={`${parent.main.id}parent`}
            onClick={() => setPostUrl(`/posts/${parent.main.id}`)}
          >
            <Post
              post={parent.main}
              onReplyClick={() => onPostClick('COMMENT', parent.main.id)}
              onRepostClick={() => onPostClick('REPOST', parent.main.id)}
              onLikeClick={() => onPostClick('LIKE', parent.main.id)}
              onBookmarkClick={() => onPostClick('BOOKMARK', parent.main.id)}
              onPostDelete={() => onPostDelete(parent.main.id)}
              parent={true}
              parentRef={index === 0 ? parentRef : null}
              lineHeight={index === 0 ? lineHeight : null}
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
        onPostDelete={() => onPostDelete(post.main.id, true)}
        main={true}
        mainRef={mainRef}
      />{' '}
      <PostForm
        onSubmit={submitComment}
        fileUrl={fileUrl}
        error={error}
        updateFile={updateFile}
        removeFile={removeFile}
        post={post}
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
              onPostDelete={() => onPostDelete(comment.id)}
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
