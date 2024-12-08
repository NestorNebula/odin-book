import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '@context';
import { Post } from '@components';
import { postInteraction } from '@services';
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
        post: repost.post,
        creationDate: repost.creationDate,
      }))
    );
  postsAndReposts.sort((a, b) => {
    return b.creationDate - a.creationDate;
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
      remove: postToUpdate.find(
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

  return (
    <S.ProfileContent>
      {postLink && <Navigate to={postLink} />}
      <S.Navbar>
        <ul>
          {sections.map((section, index) => (
            <li key={section}>
              <S.SectionButton onClick={() => setActiveSection(index)}>
                {section}
              </S.SectionButton>
            </li>
          ))}
        </ul>
      </S.Navbar>
      <S.SectionContent>
        {sections[activeSection] === 'Posts' ? (
          postsAndReposts.map(
            (p) =>
              p.post.type !== 'COMMENT' && (
                <S.Post key={p.post.id}>
                  {p.type === 'REPOST' && (
                    <div>
                      <img src={repost} alt="" />
                      <div>{p.post.userId} reposted</div>
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
                  />
                </S.Post>
              )
          )
        ) : sections[activeSection] === 'Replies' ? (
          postsAndReposts.map((p) => (
            <S.Reply key={p.post.id}>
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
              />
            </S.Reply>
          ))
        ) : sections[activeSection] === 'Media' ? (
          posts.map(
            (post) =>
              post.file && (
                <Link key={post.id} to={`posts/${post.id}`}>
                  <img src={post.file} alt="" />
                </Link>
              )
          )
        ) : sections[activeSection] === 'Likes' ? (
          <>
            <div>
              <img src={lock} alt="" />
              Your likes are private. Only you can see them.
            </div>
            {likes.map((l) => (
              <S.Like key={l.post.id}>
                <Post
                  key={l.post.id}
                  post={l.post}
                  onReplyClick={() => onPostClick('COMMENT', l.post.id, 'LIKE')}
                  onRepostClick={() => onPostClick('REPOST', l.post.id, 'LIKE')}
                  onLikeClick={() => onPostClick('LIKE', l.post.id, 'LIKE')}
                  onBookmarkClick={() =>
                    onPostClick('BOOKMARK', l.post.id, 'LIKE')
                  }
                />
              </S.Like>
            ))}
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
