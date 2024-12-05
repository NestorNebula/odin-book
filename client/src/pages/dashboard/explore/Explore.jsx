import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData, useSearchData } from '@hooks';
import { Error, Loading, SearchBar, UserList } from '@components';
import ExploreResult from './exploreresult/ExploreResult';
import * as S from './Explore.styles';

function Explore() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? null);

  const { posts, updatePost, users, error, loading } = useSearchData(search);

  const {
    data,
    error: sidebarError,
    loading: sidebarLoading,
  } = useData({
    path: `users?omit=friends&limit=10`,
    dependencies: [],
  });

  return (
    <S.Explore>
      <SearchBar onSubmit={({ value }) => setSearch(value)} />
      {search &&
        (error ? (
          <Error>{error}</Error>
        ) : loading ? (
          <Loading data="search results" />
        ) : (
          <ExploreResult posts={posts} updatePost={updatePost} users={users} />
        ))}
      {sidebarError ? (
        <Error>{sidebarError}</Error>
      ) : sidebarLoading ? (
        <Loading data="users to follow" />
      ) : (
        <UserList title="Who to follow" users={data.users} />
      )}
    </S.Explore>
  );
}

export default Explore;
