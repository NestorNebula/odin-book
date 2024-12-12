import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '@context';
import { useFile } from '@hooks';
import { Post } from '@components';
import { Button } from '@components/elements';
import { PostForm } from '@components/forms';
import { deletePost, fetchAPI, postInteraction } from '@services';
import PropTypes from 'prop-types';
import { repost } from '@assets/icons';
import * as S from './HomeContent.styles';

function HomeContent({ content, updateContent }) {
  const { user, updateInformation } = useContext(Context);

  const { posts, followingPosts, reposts } = content;
  const [postLink, setPostLink] = useState(null);

  const sections = ['All', 'Following'];
  const [displayedSection, setDisplayedSection] = useState(0);

  const followingPostsReposts = followingPosts
    .map((post) => ({ type: post.type, post, creationDate: post.creationDate }))
    .concat(
      reposts.map((repost) => ({
        type: 'REPOST',
        post: repost.post,
        creationDate: repost.creationDate,
      }))
    );
  followingPostsReposts.sort((a, b) => {
    return b.creationDate - a.creationDate;
  });

  const { fileUrl, setFileUrl, error, updateFile, removeFile } = useFile();

  const submitPost = async ({ content, file }) => {
    const fetch = await fetchAPI({
      body: { content, file },
      method: 'POST',
      path: `users/${user.id}/posts`,
    });
    if (fetch.error) {
      updateInformation({
        error: true,
        message: fetch.result.error
          ? fetch.result.error.msg
          : fetch.result.errors[0].msg,
      });
    } else {
      updateInformation({ error: null, message: 'Post created.' });
      setFileUrl(null);
    }
  };

  const structure = postInteraction.createStructure(user.id);
  const onPostClick = async (interaction, postId, postType) => {
    if (interaction === 'COMMENT') {
      return setPostLink(`/posts/${postId}`);
    }
    const postToUpdate =
      postType === 'post'
        ? posts.find((p) => p.id === postId)
        : postType === 'followingPost'
        ? followingPosts.find((p) => p.id === postId)
        : reposts.find((r) => r.post.id === postId).post;
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
      return updateInformation({ error: true, message: result.msg });
    }
    if (postType === 'post') {
      updateContent.posts(postId, result.post);
    } else if (postType === 'followingPost') {
      updateContent.followingPosts(postId, result.post);
    } else {
      updateContent.reposts(postId, result.post);
    }
  };

  const onPostDelete = async (postId, type) => {
    const fetch = await deletePost(postId, user.id);
    if (fetch.error) {
      updateInformation({ error: true, message: fetch.result.error.msg });
    } else {
      updateInformation({ error: null, message: 'Post deleted.' });
      type === 'post'
        ? updateContent.posts(postId, fetch.result.post, true)
        : type === 'followingPost'
        ? updateContent.followingPosts(postId, fetch.result.post, true)
        : updateContent.reposts(postId, fetch.result.post, true);
    }
  };

  return (
    <S.HomeContent>
      {postLink && <Navigate to={postLink} />}
      <S.Navbar>
        <ul>
          {sections.map((section, index) => (
            <li key={section}>
              <Button onClick={() => setDisplayedSection(index)}>
                {section}
              </Button>
            </li>
          ))}
        </ul>
      </S.Navbar>
      <PostForm
        onSubmit={submitPost}
        fileUrl={fileUrl}
        setFileUrl={setFileUrl}
        error={error}
        updateFile={updateFile}
        removeFile={removeFile}
      />
      <S.Posts>
        {sections[displayedSection] === 'All'
          ? posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onReplyClick={() => onPostClick('COMMENT', post.id, 'post')}
                onRepostClick={() => onPostClick('REPOST', post.id, 'post')}
                onLikeClick={() => onPostClick('LIKE', post.id, 'post')}
                onBookmarkClick={() => onPostClick('BOOKMARK', post.id, 'post')}
                onPostDelete={() => onPostDelete(post.id, 'post')}
              />
            ))
          : sections[displayedSection] === 'Following'
          ? followingPostsReposts.map((fpost) =>
              fpost.type === 'REPOST' ? (
                <div key={fpost.post.id}>
                  <div>
                    <img src={repost} />
                    <div>{fpost.post.user.profile.displayName} reposted</div>
                  </div>
                  <Post
                    post={fpost.post}
                    onReplyClick={() =>
                      onPostClick('COMMENT', fpost.post.id, 'repost')
                    }
                    onRepostClick={() =>
                      onPostClick('REPOST', fpost.post.id, 'repost')
                    }
                    onLikeClick={() =>
                      onPostClick('LIKE', fpost.post.id, 'repost')
                    }
                    onBookmarkClick={() =>
                      onPostClick('BOOKMARK', fpost.post.id, 'repost')
                    }
                    onPostDelete={() => onPostDelete(fpost.post.id, 'repost')}
                  />
                </div>
              ) : (
                <Post
                  key={fpost.id}
                  post={fpost.post}
                  onReplyClick={() =>
                    onPostClick('COMMENT', fpost.post.id, 'followingPost')
                  }
                  onRepostClick={() =>
                    onPostClick('REPOST', fpost.post.id, 'followingPost')
                  }
                  onLikeClick={() =>
                    onPostClick('LIKE', fpost.post.id, 'followingPost')
                  }
                  onBookmarkClick={() =>
                    onPostClick('BOOKMARK', fpost.post.id, 'followingPost')
                  }
                  onPostDelete={() =>
                    onPostDelete(fpost.post.id, 'followingPost')
                  }
                />
              )
            )
          : null}
      </S.Posts>
    </S.HomeContent>
  );
}

HomeContent.propTypes = {
  content: PropTypes.object.isRequired,
  updateContent: PropTypes.object.isRequired,
};

export default HomeContent;
