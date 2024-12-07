import { useContext, useState } from 'react';
import { Context } from '@context';
import { useData } from '@hooks';
import { DefaultSidebar, Error, Loading } from '@components';
import BookmarkList from './bookmarklist/BookmarkList';
import BookmarksSidebar from './bookmarkssidebar/BookmarksSidebar';
import * as S from './Bookmarks.styles';

function Bookmarks() {
  const { user } = useContext(Context);

  const [update, setUpdate] = useState(false);
  const doUpdate = () => {
    setUpdate(!update);
  };
  const { data, error, loading } = useData({
    path: `users/${user.id}/interactions?type=BOOKMARK`,
    dependencies: [update],
  });

  const [activeBookmark, setActiveBookmark] = useState(null);

  return (
    <S.Bookmarks>
      <S.Header>
        <div>Bookmarks</div>
      </S.Header>
      {error ? (
        <Error>{error}</Error>
      ) : loading ? (
        <Loading data="bookmarks" />
      ) : data.interactions.length ? (
        <BookmarkList
          bookmarks={data.interactions}
          onBookmarkClick={setActiveBookmark}
          update={doUpdate}
        />
      ) : (
        <S.EmptyBookmarks>
          <div>Save posts for later</div>
          <div>Bookmark posts to easily find them again in the future.</div>
        </S.EmptyBookmarks>
      )}
      {activeBookmark ? (
        <BookmarksSidebar
          postId={activeBookmark}
          setPostId={setActiveBookmark}
        />
      ) : (
        <DefaultSidebar />
      )}
    </S.Bookmarks>
  );
}

export default Bookmarks;
