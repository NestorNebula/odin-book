import { useContext, useState } from 'react';
import { Context } from '@context';
import { useInput } from '@hooks';
import { file, validationChains } from '@services';
import { Avatar } from '@components';
import { Button } from '@components/elements';
import { Button as SubmitButton, TextArea } from '..';
import PropTypes from 'prop-types';
import { image, close } from '@assets/icons';
import * as S from './PostForm.styles';

function PostForm({ onSubmit, fileUrl, setFileUrl, post }) {
  const { user } = useContext(Context);

  const [error, setError] = useState(null);
  const {
    value: content,
    updateValue: updateContent,
    validation: contentValidation,
  } = useInput({ validate: validationChains.postContent });
  const updateFile = async (e) => {
    if (user.loginMethod === 'GUEST') return;
    if (fileUrl) {
      const result = await removeFile();
      if (!result) return;
    }
    const fileToUpload = e.target.files[0];
    if (!fileToUpload) return;
    const result = await file.upload({
      file: fileToUpload,
      type: 'photos',
      userId: user.id,
    });
    if (result.error) {
      setError(result.error.msg);
      return;
    }
    setFileUrl(result.url);
    setError(null);
  };
  const removeFile = async () => {
    const result = await file.remove({
      url: fileUrl,
      type: 'photos',
      userId: user.id,
    });
    if (result.error) {
      setError(result.error.msg);
      return false;
    }
    setFileUrl(null);
    setError(null);
    return true;
  };

  const postIsValid = contentValidation.isValid && (!!content || !!fileUrl);
  return (
    <S.PostForm onSubmit={onSubmit}>
      <Avatar profile={user.profile} />
      <TextArea
        name="content"
        placeholder={post ? 'Post your reply' : 'What is happening?!'}
        value={content}
        updateValue={updateContent}
        validation={contentValidation}
      />
      {!!fileUrl && (
        <S.FileContainer>
          <S.File src={fileUrl} />
          <Button onClick={removeFile}>
            <img src={close} alt="remove image" />
          </Button>
        </S.FileContainer>
      )}
      <S.FileInputContainer>
        <S.FileLabel htmlFor="file">
          <img src={image} alt="upload image for your post" />
        </S.FileLabel>
        <S.FileInput
          id="file"
          type="file"
          name="file"
          value={''}
          multiple={false}
          accept="image/*"
          onChange={updateFile}
        />
      </S.FileInputContainer>
      <SubmitButton
        type={postIsValid ? 'submit' : 'button'}
        disabled={user.loginMethod === 'GUEST'}
      >
        {post ? 'Reply' : 'Post'}
      </SubmitButton>
      {!!error && <S.Error>{error}</S.Error>}
    </S.PostForm>
  );
}

PostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  fileUrl: PropTypes.string,
  setFileUrl: PropTypes.func.isRequired,
  post: PropTypes.object,
};

export default PostForm;
