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
  const [updateNotifications, setUpdateNotifications] = useState(false);
  const { data, error, loading } = useData({
    path: `users/${user.id}/notifications`,
    dependencies: [updateNotifications],
  });
  if (!error && !loading && data && !seen) {
    setSeen(true);
    if (!data.notifications.every((n) => n.seen)) {
      fetchAPI({
        method: 'PUT',
        path: `users/${user.id}/notifications`,
        statusOnly: true,
      }).then((fetch) => {
        if (fetch.error) return;
        setUpdateNotifications(true);
        updateUser();
      });
    }
  }

  return (
    <S.Notifications>
      <S.Header>Notifications</S.Header>
      {error ? (
        <Error>{error}</Error>
      ) : loading ? (
        <Loading data="notifications" />
      ) : (
        <NotificationList notifications={data.notifications} />
      )}
      <DefaultSidebar />
    </S.Notifications>
  );
}

export default Notifications;
