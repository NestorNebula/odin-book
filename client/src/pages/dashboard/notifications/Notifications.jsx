import { useContext, useState } from 'react';
import { Context } from '@context';
import { Error, DefaultSidebar, Loading } from '@components';
import { useData } from '@hooks';
import NotificationList from './notificationlist/NotificationList';
import { fetchAPI } from '@services';
import * as S from './Notifications.styles';

function Notifications() {
  const { user, updateUser } = useContext(Context);
  const [seen, setSeen] = useState(false);
  const { data, error, loading } = useData({
    path: `users/${user.id}/notifications`,
    dependencies: [],
  });
  if (!error && !loading && data && !seen) {
    setSeen(true);
    fetchAPI({
      method: 'PUT',
      path: `users/${user.id}/notifications`,
      statusOnly: true,
    }).then((fetch) => {
      if (fetch.error) return;
      updateUser();
    });
  }

  return (
    <S.Notifications>
      <title>Notifications / Odin-Book</title>
      <S.Content>
        <S.Header>Notifications</S.Header>
        {error ? (
          <Error>{error}</Error>
        ) : loading ? (
          <Loading data="notifications" />
        ) : data.notifications && data.notifications.length ? (
          <NotificationList notifications={data.notifications} />
        ) : (
          <S.Empty>
            <div>{"You don't have any notification"}</div>
            <div>
              Your notifications will be displayed here when someone will
              interact with your account or with your posts.
            </div>
          </S.Empty>
        )}
      </S.Content>
      <DefaultSidebar />
    </S.Notifications>
  );
}

export default Notifications;
