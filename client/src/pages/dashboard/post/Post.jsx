import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '@hooks';
import { DefaultSidebar, Error, Loading, PostDetails } from '@components';
import * as S from './Post.styles';

function Post() {
  const [update, setUpdate] = useState(false);
  const doUpdate = () => setUpdate(!update);
  const { postId } = useParams();
  const { data, error, loading } = useData({
    path: `posts/${postId}`,
    dependencies: [update, postId],
  });

  return (
    <S.Post>
      <title>
        {data && data.post
          ? `${data.post.main.user.profile.displayName} on Odin-Book: "${
              data.post.main.content ?? 'File'
            }" / Odin-Book`
          : 'Post / Odin-Book'}
      </title>
      <S.Content>
        <S.Header>
          <div>Post</div>
        </S.Header>
        {error ? (
          <Error>{error}</Error>
        ) : loading ? (
          <Loading data="post" />
        ) : (
          <PostDetails post={data.post} update={doUpdate} />
        )}
      </S.Content>
      <DefaultSidebar />
    </S.Post>
  );
}

export default Post;
