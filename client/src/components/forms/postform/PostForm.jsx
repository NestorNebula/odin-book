import { useContext } from 'react';
import { Context } from '@context';
import { useInput } from '@hooks';
import { validationChains } from '@services';
import { Avatar } from '@components';
import { Button } from '@components/elements';
import { Button as SubmitButton, TextArea } from '..';
import PropTypes from 'prop-types';
import { image, close } from '@assets/icons';
import * as S from './PostForm.styles';

function PostForm({ onSubmit, fileUrl, error, updateFile, removeFile, post }) {
  const { user } = useContext(Context);

  const {
    value: content,
    updateValue: updateContent,
    validation: contentValidation,
  } = useInput({ validate: validationChains.postContent });

  const postIsValid = contentValidation.isValid && (!!content || !!fileUrl);
  return (
    <S.PostForm onSubmit={() => onSubmit({ content, fileUrl })}>
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
          <Button onClick={() => removeFile(user, 'photos')}>
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
          onChange={(e) => updateFile(user, e.target.files[0], 'photos')}
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
  error: PropTypes.string,
  updateFile: PropTypes.func.isRequired,
  removeFile: PropTypes.func.isRequired,
  post: PropTypes.object,
};

export default PostForm;
