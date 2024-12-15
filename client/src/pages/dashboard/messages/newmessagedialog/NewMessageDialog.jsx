import { useContext, useState } from 'react';
import { Context } from '@context';
import { Avatar } from '@components';
import { Button, Dialog } from '@components/elements';
import PropTypes from 'prop-types';
import { check } from '@assets/icons';
import * as S from './NewMessageDialog.styles';

function NewMessageDialog({ dialog, onSubmit, chats }) {
  const { user } = useContext(Context);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const usersToRender = user.following
    .map((usr) => {
      if (chats.some((c) => c.users.some((u) => u.id === usr.id))) return;
      return (
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
      );
    })
    .filter((u) => u);

  return (
    <Dialog.Main dialogRef={dialog.ref} close={dialog.close}>
      <Dialog.Header>
        <Dialog.CloseButton
          close={() => {
            dialog.close();
            setSelectedUserId(null);
          }}
        />
        <S.Title>New Message</S.Title>
        <Button
          onClick={() => {
            if (selectedUserId) {
              onSubmit(selectedUserId);
              dialog.close();
              setSelectedUserId(null);
            }
          }}
        >
          Next
        </Button>
      </Dialog.Header>
      <S.Users>
        {usersToRender.length ? (
          usersToRender
        ) : (
          <S.NoUser>No friends to message.</S.NoUser>
        )}
      </S.Users>
    </Dialog.Main>
  );
}

NewMessageDialog.propTypes = {
  dialog: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  chats: PropTypes.array.isRequired,
};

export default NewMessageDialog;
