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
        const lastMessage = !!chat.messages.length && chat.messages[0];
        return (
          <S.Button
            key={chat.id}
            onClick={() => setChat(chat)}
            aria-label={
              chat.id === chatId
                ? `chat with ${friend.profile.displayName} opened`
                : `open chat with ${friend.profile.displayName}`
            }
            $active={chat.id === chatId}
          >
            <S.Chat>
              <Avatar profile={friend.profile} />
              <S.ChatInfos>
                <div>{friend.profile.displayName}</div>
                <div>{`@${friend.username}`}</div>
                {lastMessage &&
                  chat.creationDate !== lastMessage.creationDate && (
                    <div>・ {format(lastMessage.creationDate, 'MMM d')}</div>
                  )}
              </S.ChatInfos>
              {lastMessage && (
                <S.LastMessage>{lastMessage.content}</S.LastMessage>
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
