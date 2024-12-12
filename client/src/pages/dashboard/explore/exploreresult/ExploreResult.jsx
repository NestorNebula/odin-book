import { useContext, useState } from 'react';
import { Context } from '@context';
import { Link, Navigate } from 'react-router-dom';
import { Post, UserList } from '@components';
import { Button } from '@components/elements';
import { deletePost, postInteraction } from '@services';
import PropTypes from 'prop-types';
import * as S from './ExploreResult.styles';

function ExploreResult({ posts, updatePost, users }) {
  const { user, updateInformation } = useContext(Context);
  const sections = ['Top', 'Latest', 'People', 'Media'];
  const [activeSection, setActiveSection] = useState(0);
  const recentPosts = posts.toSorted((a, b) => b.creationDate - a.creationDate);
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

  return (
    <S.ExploreResult>
      {postLink && <Navigate to={postLink} />}
      <S.Navbar>
        <ul>
          {sections.map((section, index) => (
            <li key={section}>
              <Button onClick={() => setActiveSection(index)}>{section}</Button>
            </li>
          ))}
        </ul>
      </S.Navbar>
      {sections[activeSection] === 'Top' ? (
        <S.Posts>
          {posts.map((post) => (
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
      ) : sections[activeSection] === 'Latest' ? (
        <S.Posts>
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
      ) : sections[activeSection] === 'People' ? (
        <UserList users={users} details={true} />
      ) : sections[activeSection] === 'Media' ? (
        <S.Media>
          {mediaPosts.map((post) => (
            <Link key={post.id} to={`posts/${post.id}`}>
              <img src={post.file} alt="" />
            </Link>
          ))}
        </S.Media>
      ) : null}
    </S.ExploreResult>
  );
}

ExploreResult.propTypes = {
  posts: PropTypes.array.isRequired,
  updatePost: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

export default ExploreResult;
