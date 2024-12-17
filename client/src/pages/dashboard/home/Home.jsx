import { useContext } from 'react';
import { Context } from '@context';
import { usePosts } from '@hooks';
import { Error, DefaultSidebar, Loading } from '@components';
import HomeContent from './homecontent/HomeContent';
import styled from 'styled-components';

const StyledHome = styled.main`
  display: grid;
  grid-template-columns: 2.5fr 2fr;
  border-left: ${(props) => `1px solid ${props.theme.fifthGray}`};

  @media (max-width: 1000px) {
    & > aside {
      display: none;
    }
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

function Home() {
  const { user } = useContext(Context);
  const {
    posts,
    updatePost,
    error: postsError,
    loading: postsLoading,
  } = usePosts({ postsPath: 'posts' });
  const {
    posts: followingPosts,
    reposts,
    updatePost: updateFollowinPost,
    updateRepost,
    error: followingError,
    loading: followingLoading,
  } = usePosts({
    postsPath: `users/${user.id}/following/posts`,
    fetchReposts: true,
  });

  return (
    <StyledHome>
      {postsError || followingError ? (
        <Error>Error when loading posts.</Error>
      ) : postsLoading || followingLoading ? (
        <Loading data="posts" />
      ) : (
        <HomeContent
          content={{ posts, followingPosts, reposts }}
          updateContent={{
            posts: updatePost,
            followingPosts: updateFollowinPost,
            reposts: updateRepost,
          }}
        />
      )}
      <DefaultSidebar />
    </StyledHome>
  );
}

export default Home;
