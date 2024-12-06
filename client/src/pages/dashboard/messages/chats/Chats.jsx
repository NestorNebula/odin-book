import { useContext } from 'react';
import { Context } from '@context';
import { Avatar } from '@components';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import * as S from './Chats.styles';

function Chats({ chat, chats, setChat }) {
  const { user } = useContext(Context);
  const chatId = chat ? chat.id : null;

  return (
    <S.Chats>
      {chats.map((chat) => {
        const friend = chat.users.find((usr) => usr.id !== user.id);
        return (
          <S.Button
            key={chat.id}
            onClick={() => setChat(chat)}
            aria-label={
              chat.id === chatId
                ? `chat with ${friend.profile.displayName} opened`
                : `open chat with ${friend.profile.displayName}`
            }
          >
            <S.Chat>
              <Avatar profile={friend.profile} />
              <div>{friend.profile.displayName}</div>
              <div>{`@${friend.username}`}</div>
              {chat.creationDate !== chat.updatedAt && (
                <div>・ {format(chat.updatedAt, 'MMM d')}</div>
              )}
              {chat.messages.length && (
                <div>{chat.messages[chat.messages.length - 1].content}</div>
              )}
            </S.Chat>
          </S.Button>
        );
      })}
    </S.Chats>
  );
}

Chats.propTypes = {
  chat: PropTypes.object,
  chats: PropTypes.array.isRequired,
  setChat: PropTypes.func.isRequired,
};

export default Chats;
