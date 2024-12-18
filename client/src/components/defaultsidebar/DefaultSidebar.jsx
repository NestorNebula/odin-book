import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useData } from '@hooks';
import { Credits, Error, Loading, SearchBar, UserList } from '@components';
import * as S from './DefaultSidebar.styles';

function DefaultSidebar() {
  const [searchValue, setSearchValue] = useState(null);

  const { data, error, loading } = useData({
    path: 'users?omit=friends&limit=20',
  });

  return (
    <S.Sidebar>
      {searchValue && (
        <Navigate to={`/explore?search=${encodeURIComponent(searchValue)}`} />
      )}
      <SearchBar onSubmit={({ value }) => setSearchValue(value)} />
      {error ? (
        <Error>{error}</Error>
      ) : loading ? (
        <Loading data="users to follow" />
      ) : (
        <UserList title="Who to follow" users={data.users} />
      )}
      <Credits />
    </S.Sidebar>
  );
}

export default DefaultSidebar;
