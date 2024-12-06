import { useContext } from 'react';
import { Context } from '@context';
import { Avatar } from '@components';
import { PostForm } from '@components/forms';
import { Dialog } from '@components/elements';
import { useFile } from '@hooks';
import { date, fetchAPI } from '@services';
import PropTypes from 'prop-types';
import * as S from './CommentDialog.styles';

function CommentDialog({ dialog, post, update }) {
  const { user, updateInformation } = useContext(Context);

  const { fileUrl, setFileUrl, error, updateFile, removeFile } = useFile();

  const submitComment = async ({ content, file }) => {
    const fetch = await fetchAPI({
      body: { content, file, postId: post.id },
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
      dialog.close();
      update();
    }
  };

  return (
    <Dialog.Main dialogRef={dialog.ref} close={dialog.close}>
      <Dialog.Header>
        <Dialog.CloseButton close={dialog.close} />
      </Dialog.Header>
      <S.PostCommented>
        <Avatar profile={post.user.profile} />
        <S.PostHeader>
          <div>{post.user.profile.displayName}</div>
          <div>@{post.user.username}</div>
          <div>・ {date.getDate(post.creationDate)}</div>
        </S.PostHeader>
        <S.PostContent>
          {!!post.content && <div>{post.content}</div>}
          {!!post.file && <img src={post.file} />}
        </S.PostContent>
        <div>Replying to @{post.user.username}</div>
      </S.PostCommented>
      <PostForm
        onSubmit={submitComment}
        fileUrl={fileUrl}
        error={error}
        updateFile={updateFile}
        removeFile={removeFile}
        post={post}
      />
    </Dialog.Main>
  );
}

CommentDialog.propTypes = {
  dialog: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
};

export default CommentDialog;
