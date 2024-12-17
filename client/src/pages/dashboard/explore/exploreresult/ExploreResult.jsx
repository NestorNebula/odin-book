import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Context } from '@context';
import { Link, Navigate } from 'react-router-dom';
import { NavbarButton, Post, UserList } from '@components';
import { deletePost, postInteraction } from '@services';
import PropTypes from 'prop-types';
import * as S from './ExploreResult.styles';

function ExploreResult({ posts, updatePost, users, search }) {
  const { user, updateInformation } = useContext(Context);
  const sections = ['Top', 'Latest', 'People', 'Media'];
  const [activeSection, setActiveSection] = useState(
    !posts.length && users.length ? 2 : 0
  );

  const recentPosts = posts.toSorted(
    (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
  );
  const mediaPosts = posts.filter((p) => !!p.file);

  const [postLink, setPostLink] = useState(null);
  const structure = postInteraction.createStructure(user.id);
  const onPostClick = async (interaction, postId) => {
    if (interaction === 'COMMENT') {
      return setPostLink(`/posts/${postId}`);
    }
    const postToUpdate = posts.find((post) => post.id === postId);
    if (!postToUpdate) return;
    const result = await postInteraction.interact({
      structure,
      interaction,
      postId,
      remove: postToUpdate.interactions.some(
        (i) => i.type === interaction && i.userId === user.id
      ),
    });
    if (!result.success) {
      updateInformation({ error: true, message: result.msg });
    } else {
      updatePost(result.post);
    }
  };

  const onPostDelete = async (postId) => {
    const fetch = await deletePost(postId, user.id);
    if (fetch.error) {
      updateInformation({ error: true, message: fetch.result.error.msg });
    } else {
      updateInformation({ error: null, message: 'Post deleted.' });
      updatePost(fetch.result.post, true);
    }
  };

  const contentRef = useRef();

  const [contentWidth, setContentWidth] = useState(0);
  useLayoutEffect(() => {
    const updateWidth = () => {
      setContentWidth(contentRef.current ? contentRef.current.offsetWidth : 0);
    };
    window.addEventListener('DOMContentLoaded', updateWidth);
    window.addEventListener('resize', updateWidth);
    updateWidth();

    return () => {
      window.removeEventListener('resize', updateWidth);
      window.removeEventListener('DOMContentLoaded', updateWidth);
    };
  }, []);

  return (
    <S.ExploreResult>
      {postLink && <Navigate to={postLink} />}
      <S.Navbar>
        <ul>
          {sections.map((section, index) => (
            <li key={section}>
              <NavbarButton
                onClick={() => setActiveSection(index)}
                selected={activeSection === index}
              >
                {section}
              </NavbarButton>
            </li>
          ))}
        </ul>
      </S.Navbar>
      {sections[activeSection] === 'Top' ? (
        <S.Posts ref={contentRef}>
          {posts.length ? (
            posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onReplyClick={() => onPostClick('COMMENT', post.id)}
                onRepostClick={() => onPostClick('REPOST', post.id)}
                onLikeClick={() => onPostClick('LIKE', post.id)}
                onBookmarkClick={() => onPostClick('BOOKMARK', post.id)}
                onPostDelete={() => onPostDelete(post.id)}
              />
            ))
          ) : (
            <S.Empty>
              <div>{`No results for "${search}"`}</div>
              <div>Try searching for something else.</div>
            </S.Empty>
          )}
        </S.Posts>
      ) : sections[activeSection] === 'Latest' ? (
        recentPosts.length ? (
          <S.Posts ref={contentRef}>
            {recentPosts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onReplyClick={() => onPostClick('COMMENT', post.id)}
                onRepostClick={() => onPostClick('REPOST', post.id)}
                onLikeClick={() => onPostClick('LIKE', post.id)}
                onBookmarkClick={() => onPostClick('BOOKMARK', post.id)}
                onPostDelete={() => onPostDelete(post.id)}
              />
            ))}
          </S.Posts>
        ) : (
          <S.Empty>
            <div>{`No results for "${search}"`}</div>
            <div>Try searching for something else.</div>
          </S.Empty>
        )
      ) : sections[activeSection] === 'People' ? (
        users.length ? (
          <UserList users={users} details={true} />
        ) : (
          <S.Empty>
            <div>{`No results for "${search}"`}</div>
            <div>Try searching for something else.</div>
          </S.Empty>
        )
      ) : sections[activeSection] === 'Media' ? (
        mediaPosts.length ? (
          <S.Media ref={contentRef} $width={contentWidth}>
            {mediaPosts.map((post) => (
              <Link key={post.id} to={`/posts/${post.id}`}>
                <img src={post.file} alt="" />
              </Link>
            ))}
          </S.Media>
        ) : (
          <S.Empty>
            <div>{`No results for "${search}"`}</div>
            <div>Try searching for something else.</div>
          </S.Empty>
        )
      ) : null}
    </S.ExploreResult>
  );
}

ExploreResult.propTypes = {
  posts: PropTypes.array.isRequired,
  updatePost: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
};

export default ExploreResult;
