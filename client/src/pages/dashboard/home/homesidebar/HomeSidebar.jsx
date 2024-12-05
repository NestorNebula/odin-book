import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useData } from '@hooks';
import { Error, Loading, SearchBar, UserList } from '@components';
import * as S from './HomeSidebar.styles';

function HomeSidebar() {
  const [searchValue, setSearchValue] = useState(null);
  const { data, error, loading } = useData({
    path: `users?omit=friends&limit=10`,
    dependencies: [],
  });

  return (
    <S.HomeSidebar>
      {searchValue && (
        <Navigate to={`/explore?search=${encodeURIComponent(searchValue)}`} />
      )}
      <SearchBar onSubmit={({ value }) => setSearchValue(value)} />
      {error ? (
        <Error>Error when loading users to follow.</Error>
      ) : loading ? (
        <Loading data="users to follow" />
      ) : (
        <UserList title="Who to follow" users={data.users} />
      )}
    </S.HomeSidebar>
  );
}

export default HomeSidebar;
