import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '@context';
import { Avatar } from '@components';
import { fetchAPI } from '@services';
import { format } from 'date-fns';
import MessageForm from '../messageform/MessageForm';
import PropTypes from 'prop-types';
import { close } from '@assets/icons';
import * as S from './Chat.styles';

function Chat({ chat, setChat, update }) {
  const { user, updateInformation } = useContext(Context);
  const friend = chat.users.find((usr) => usr.id !== user.id);

  const submitMessage = async ({ content, file }) => {
    const fetch = await fetchAPI({
      body: { content, file },
      method: 'POST',
      path: `users/${user.id}/chats/${chat.id}/messages`,
    });
    if (fetch.error) {
      updateInformation({
        error: true,
        message: fetch.result.error
          ? fetch.result.error.msg
          : fetch.result.errors[0].msg,
      });
    } else {
      updateInformation({ error: null, message: 'Message sent.' });
      update();
    }
  };

  return (
    <S.Chat>
      <S.Header>
        <S.CloseButton
          aria-label={`close chat with ${friend.profile.displayName}`}
          onClick={() => setChat(null)}
        >
          <img src={close} alt="" />
        </S.CloseButton>
        <Link to={`/${friend.id}`}>
          <Avatar profile={friend.profile} width="3.5rem" />
        </Link>
        <div>{friend.profile.displayName}</div>
      </S.Header>
      <S.Messages>
        {chat.messages.map((message) => (
          <S.Message key={message.id} $user={user.id === message.userId}>
            {message.file && <S.File src={message.file} alt=""></S.File>}
            {message.content && (
              <S.Content $user={user.id === message.userId}>
                {message.content}
              </S.Content>
            )}
            <div>{format(message.creationDate, 'MMM d, y, p')}</div>
          </S.Message>
        ))}
      </S.Messages>
      <MessageForm onSubmit={submitMessage} />
    </S.Chat>
  );
}

Chat.propTypes = {
  chat: PropTypes.object.isRequired,
  setChat: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

export default Chat;
