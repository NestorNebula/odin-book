import { useContext } from 'react';
import { Context } from '@context';
import { useInput } from '@hooks';
import { validationChains } from '@services';
import { Avatar } from '@components';
import { Button } from '@components/elements';
import { Button as SubmitButton, FileInput, TextArea } from '..';
import PropTypes from 'prop-types';
import { theme } from '@styles';
import { close, image } from '@assets/icons';
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
    <S.PostForm
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ content, file: fileUrl });
      }}
    >
      <Avatar profile={user.profile} />
      <S.Content>
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
            <Button
              onClick={() => removeFile(user, 'photos')}
              backgroundColor={theme.secondaryBlack}
              noHover={true}
            >
              <img src={close} alt="remove image" />
            </Button>
          </S.FileContainer>
        )}
      </S.Content>
      <FileInput
        onChange={(e) => updateFile(user, e.target.files[0], 'photos')}
        image={image}
      />
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
