import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '@context';
import { fetchAPI } from '@services';
import PropTypes from 'prop-types';
import { message } from '@assets/icons';
import styled from 'styled-components';

const StyledMessageButton = styled.button``;

function MessageButton({ displayedUser }) {
  const { user } = useContext(Context);
  const [redirect, setRedirect] = useState(false);

  const sendMessage = async () => {
    const fetchExisting = await fetchAPI({
      method: 'GET',
      path: `users/${user.id}/chats`,
    });
    if (fetchExisting.error) return;
    if (
      !fetchExisting.result.chats.some((chat) =>
        chat.users.some((u) => u.id === displayedUser.id)
      )
    ) {
      const fetchNew = await fetchAPI({
        body: { userId: displayedUser.id },
        method: 'POST',
        path: `users/${user.id}/chats`,
        statusOnly: true,
      });
      if (fetchNew.error) return;
    }
    setRedirect(true);
  };

  return (
    <StyledMessageButton
      onClick={async () => await sendMessage()}
      aria-label={`send message to ${displayedUser.profile.displayName} (@${displayedUser.username})`}
    >
      {redirect && <Navigate to={`/messages`} />}
      <img src={message} alt="" />
    </StyledMessageButton>
  );
}

MessageButton.propTypes = {
  displayedUser: PropTypes.object.isRequired,
};

export default MessageButton;
