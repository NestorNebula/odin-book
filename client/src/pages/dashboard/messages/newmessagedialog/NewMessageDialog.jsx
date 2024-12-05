import { useContext, useState } from 'react';
import { Context } from '@context';
import { Avatar } from '@components';
import { Button, Dialog } from '@components/elements';
import PropTypes from 'prop-types';
import { check } from '@assets/icons';
import * as S from './NewMessageDialog.styles';

function NewMessageDialog({ dialog, onSubmit }) {
  const { user } = useContext(Context);
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <Dialog.Main dialogRef={dialog.ref} close={dialog.close}>
      <Dialog.Header>
        <Dialog.CloseButton close={dialog.close} />
        <div>New Message</div>
        <Button
          onClick={() => (selectedUserId ? onSubmit(selectedUserId) : null)}
        >
          Next
        </Button>
      </Dialog.Header>
      <S.Users>
        {user.following.map((usr) => (
          <S.User
            key={usr.id}
            onClick={() => setSelectedUserId(usr.id)}
            aria-label={`select ${usr.profile.displayName} (@${usr.username})`}
          >
            <Avatar profile={usr.profile} />
            <div>{usr.profile.displayName}</div>
            <div>{`@${usr.username}`}</div>
            {usr.id === selectedUserId && (
              <img src={check} alt="" aria-label="selected" />
            )}
          </S.User>
        ))}
      </S.Users>
    </Dialog.Main>
  );
}

NewMessageDialog.propTypes = {
  dialog: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewMessageDialog;
