import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '@context';
import { NavbarButton, Post } from '@components';
import { deletePost, postInteraction } from '@services';
import PropTypes from 'prop-types';
import { lock, repost } from '@assets/icons';
import * as S from './ProfileContent.styles';

function ProfileContent({ content, update, isUser }) {
  const { user, updateInformation } = useContext(Context);

  const { posts, reposts, likes } = content;
  const postsAndReposts = posts
    .map((post) => ({ type: post.type, post, creationDate: post.creationDate }))
    .concat(
      reposts.map((repost) => ({
        type: 'REPOST',
        user: repost.user,
        post: repost.post,
        creationDate: repost.creationDate,
      }))
    );
  postsAndReposts.sort((a, b) => {
    return new Date(b.creationDate) - new Date(a.creationDate);
  });
  const sections = isUser
    ? ['Posts', 'Replies', 'Media', 'Likes']
    : ['Posts', 'Replies', 'Media'];
  const [activeSection, setActiveSection] = useState(0);

  const [postLink, setPostLink] = useState(null);

  const structure = postInteraction.createStructure(user.id);
  const onPostClick = async (interaction, postId, postType) => {
    if (interaction === 'COMMENT') {
      return setPostLink(`/posts/${postId}`);
    }
    const postToUpdate =
      postType === 'LIKE'
        ? likes.find((l) => l.post.id === postId).post
        : postType === 'REPOST'
        ? reposts.find((r) => r.post.id === postId).post
        : posts.find((post) => post.id === postId);
    if (!postToUpdate) return;
    const result = await postInteraction.interact({
      structure,
      interaction,
      postId,
      remove: postToUpdate.interactions.find(
        (i) => i.type === interaction && i.userId === user.id
      ),
    });
    if (!result.success) {
      updateInformation({ error: true, message: result.msg });
    } else {
      updateInformation({ error: null, message: result.msg });
      if (postType === 'LIKE') {
        update.likes();
      } else if (postType === 'REPOST') {
        update.repost(postToUpdate.id, result.post);
      } else {
        update.post(postToUpdate.id, result.post);
      }
    }
  };

  const onPostDelete = async (postId, type) => {
    const fetch = await deletePost(postId, user.id);
    if (fetch.error) {
      updateInformation({ error: true, message: fetch.result.error.msg });
    } else {
      updateInformation({ error: null, message: 'Post deleted.' });
      type === 'LIKE'
        ? update.likes()
        : type === 'REPOST'
        ? update.repost(postId, fetch.result.post, true)
        : update.post(postId, fetch.result.post, true);
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
    <S.ProfileContent>
      {postLink && <Navigate to={postLink} />}
      <S.Navbar>
        <ul>
          {sections.map((section, index) => (
            <li key={section}>
              <NavbarButton
                onClick={() => setActiveSection(index)}
                selected={index === activeSection}
              >
                {section}
              </NavbarButton>
            </li>
          ))}
        </ul>
      </S.Navbar>
      <S.SectionContent>
        {sections[activeSection] === 'Posts' ? (
          <S.Posts ref={contentRef}>
            {postsAndReposts.map(
              (p) =>
                p.post.type !== 'COMMENT' && (
                  <S.Post key={`${p.post.id}${p.type}`}>
                    {p.type === 'REPOST' && (
                      <div>
                        <img src={repost} alt="" />
                        <div>{p.user.profile.displayName} reposted</div>
                      </div>
                    )}
                    <Post
                      post={p.post}
                      onReplyClick={() =>
                        onPostClick('COMMENT', p.post.id, p.type)
                      }
                      onRepostClick={() =>
                        onPostClick('REPOST', p.post.id, p.type)
                      }
                      onLikeClick={() => onPostClick('LIKE', p.post.id, p.type)}
                      onBookmarkClick={() =>
                        onPostClick('BOOKMARK', p.post.id, p.type)
                      }
                      onPostDelete={() => onPostDelete(p.post.id, p.type)}
                    />
                  </S.Post>
                )
            )}
          </S.Posts>
        ) : sections[activeSection] === 'Replies' ? (
          <S.Replies ref={contentRef}>
            {' '}
            {postsAndReposts.map((p) => (
              <S.Reply key={`${p.post.id}${p.type}`}>
                {p.type === 'REPOST' && (
                  <div>
                    <img src={repost} alt="" />
                    <div>{p.post.userId} reposted</div>
                  </div>
                )}
                <Post
                  post={p.post}
                  onReplyClick={() => onPostClick('COMMENT', p.post.id, p.type)}
                  onRepostClick={() => onPostClick('REPOST', p.post.id, p.type)}
                  onLikeClick={() => onPostClick('LIKE', p.post.id, p.type)}
                  onBookmarkClick={() =>
                    onPostClick('BOOKMARK', p.post.id, p.type)
                  }
                  onPostDelete={() => onPostDelete(p.post.id, p.type)}
                />
              </S.Reply>
            ))}{' '}
          </S.Replies>
        ) : sections[activeSection] === 'Media' ? (
          <S.Medias ref={contentRef} $width={contentWidth}>
            {posts.map(
              (post) =>
                post.file && (
                  <Link key={post.id} to={`/posts/${post.id}`}>
                    <img src={post.file} alt="" />
                  </Link>
                )
            )}
          </S.Medias>
        ) : sections[activeSection] === 'Likes' ? (
          <>
            <S.LikeMessage>
              <img src={lock} alt="" />
              Your likes are private. Only you can see them.
            </S.LikeMessage>
            <S.Likes ref={contentRef}>
              {likes.map((l) => (
                <S.Like key={l.post.id}>
                  <Post
                    key={l.post.id}
                    post={l.post}
                    onReplyClick={() =>
                      onPostClick('COMMENT', l.post.id, 'LIKE')
                    }
                    onRepostClick={() =>
                      onPostClick('REPOST', l.post.id, 'LIKE')
                    }
                    onLikeClick={() => onPostClick('LIKE', l.post.id, 'LIKE')}
                    onBookmarkClick={() =>
                      onPostClick('BOOKMARK', l.post.id, 'LIKE')
                    }
                    onPostDelete={() => onPostDelete(l.post.id, 'LIKE')}
                  />
                </S.Like>
              ))}
            </S.Likes>
          </>
        ) : null}
      </S.SectionContent>
    </S.ProfileContent>
  );
}

ProfileContent.propTypes = {
  content: PropTypes.object.isRequired,
  update: PropTypes.object.isRequired,
  isUser: PropTypes.bool.isRequired,
};

export default ProfileContent;
