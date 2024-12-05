import { useContext, useState } from 'react';
import { Context } from '@context';
import { Error, Loading } from '@components';
import { useData } from '@hooks';
import NotificationList from './notificationlist/NotificationList';
import NotificationsSidebar from './notificationssidebar/NotificationsSidebar';
import { fetchAPI } from '@services';
import * as S from './Notifications.styles';

function Notifications() {
  const { user } = useContext(Context);
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
      <NotificationsSidebar />
    </S.Notifications>
  );
}

export default Notifications;
