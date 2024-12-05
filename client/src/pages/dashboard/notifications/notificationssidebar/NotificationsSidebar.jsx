import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useData } from '@hooks';
import { Error, Loading, SearchBar, UserList } from '@components';
import styled from 'styled-components';

const StyledNotificationsSidebar = styled.aside``;

function NotificationsSidebar() {
  const [searchUrl, setSearchUrl] = useState(null);

  const { data, error, loading } = useData({
    path: 'users?omit=friends&limit=20',
  });

  return (
    <StyledNotificationsSidebar>
      {searchUrl && (
        <Navigate to={`/explore?search=${encodeURIComponent(searchUrl)}`} />
      )}
      <SearchBar onSubmit={({ value }) => setSearchUrl(value)} />
      {error ? (
        <Error>{error}</Error>
      ) : loading ? (
        <Loading data="users to follow" />
      ) : (
        <UserList title="Who to follow" users={data.users} />
      )}
    </StyledNotificationsSidebar>
  );
}

export default NotificationsSidebar;
