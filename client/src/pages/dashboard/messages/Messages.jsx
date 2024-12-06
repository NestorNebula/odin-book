import { useContext, useState } from 'react';
import { Context } from '@context';
import { useData, useDialog } from '@hooks';
import { fetchAPI } from '@services';
import { Error, Loading } from '@components';
import { Button } from '@components/elements';
import NewMessageDialog from './newmessagedialog/NewMessageDialog';
import Chats from './chats/Chats';
import Chat from './chat/Chat';
import { newMessage } from '@assets/icons';
import * as S from './Messages.styles';

function Messages() {
  const { user, updateInformation } = useContext(Context);

  const [updateChats, setUpdateChats] = useState(false);
  const update = () => setUpdateChats(!updateChats);
  const { data, error, loading } = useData({
    path: `users/${user.id}/chats`,
    dependencies: [updateChats],
  });
  const [chat, setChat] = useState(null);

  const { dialogRef, open, close } = useDialog();
  const submitNewChat = async (userId) => {
    const fetch = await fetchAPI({
      body: { userId },
      method: 'POST',
      path: `users/${user.id}/chats`,
    });
    if (fetch.error || !fetch.result.chat) {
      updateInformation({
        error: true,
        message: fetch.error
          ? fetch.result.error.msg
          : 'Error when creating chat.',
      });
    } else {
      updateInformation({ error: null, message: 'Chat created.' });
      update();
    }
  };

  return (
    <S.Messages>
      <NewMessageDialog
        dialog={{ ref: dialogRef, open, close }}
        onSubmit={submitNewChat}
      />
      <S.Header>
        <div>Messages</div>
        <Button onClick={open}>
          <img src={newMessage} alt="" aria-label="new message" />
        </Button>
      </S.Header>
      {error ? (
        <Error>{error}</Error>
      ) : loading ? (
        <Loading data="chats" />
      ) : !data.chats.length ? (
        <S.NewMessage.Main>
          <S.NewMessage.Header>Welcome to your inbox!</S.NewMessage.Header>
          <S.NewMessage.Content>
            Drop a line, share posts and more with private conversations between
            you and others on Odin-Book.
          </S.NewMessage.Content>
          <Button onClick={open}>Write a message</Button>
        </S.NewMessage.Main>
      ) : (
        <Chats chat={chat} chats={data.chats} setChat={setChat} />
      )}
      {chat ? (
        <Chat chat={chat} update={update} />
      ) : (
        <S.NewMessage.Main>
          <S.NewMessage.Header>Select a message</S.NewMessage.Header>
          <S.NewMessage.Content>
            Choose from your existing conversations, start a new one, or just
            keep swimming.
          </S.NewMessage.Content>
          <Button onClick={open}>New message</Button>
        </S.NewMessage.Main>
      )}
    </S.Messages>
  );
}

export default Messages;
