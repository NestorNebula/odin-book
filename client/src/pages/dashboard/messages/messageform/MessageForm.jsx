import { useContext, useMemo, useState } from 'react';
import { Context } from '@context';
import { useFile } from '@hooks';
import { Button } from '@components/elements';
import { Button as SubmitButton, FileInput, TextArea } from '@components/forms';
import PropTypes from 'prop-types';
import { close, send, image } from '@assets/icons';
import * as S from './MessageForm.styles';

function MessageForm({ onSubmit }) {
  const { user, updateInformation } = useContext(Context);

  const [content, setContent] = useState('');
  const { fileUrl, setFileUrl, error, updateFile, removeFile } = useFile();
  useMemo(() => {
    if (error === null) return;
    updateInformation({ error: true, message: error });
  }, [updateInformation, error]);

  const isValid = !!content || !!fileUrl;

  return (
    <S.MessageForm
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({ content, file: fileUrl });
        setContent('');
        setFileUrl(null);
      }}
    >
      {!fileUrl ? (
        <FileInput
          onChange={(e) => updateFile(user, e.target.files[0], 'photos')}
          image={image}
        />
      ) : (
        <span></span>
      )}
      <S.Content>
        {fileUrl && (
          <S.FileContainer>
            <S.File src={fileUrl} alt="" />
            <Button onClick={() => removeFile(user, 'photos')} noHover={true}>
              <img src={close} alt="remove image" />
            </Button>
          </S.FileContainer>
        )}
        <TextArea
          name="content"
          placeholder="Start a message"
          value={content}
          updateValue={(e) => setContent(e.target.value)}
          validation={{ isValid: true }}
        />
      </S.Content>
      <SubmitButton
        type={isValid ? 'submit' : 'button'}
        disabled={user.loginMethod === 'GUEST'}
      >
        <S.SendImg src={send} alt="" aria-label="send message" />
      </SubmitButton>
    </S.MessageForm>
  );
}

MessageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default MessageForm;
