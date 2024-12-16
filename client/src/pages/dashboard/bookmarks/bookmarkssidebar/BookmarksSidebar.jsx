import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useData } from '@hooks';
import { Error, Loading, PostDetails } from '@components';
import { close, extend } from '@assets/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSidebar = styled.aside`
  padding: 1rem;
`;
const StyledHeader = styled.header`
  display: flex;
  font-size: 2rem;
  font-weight: 700;
  gap: 3rem;

  & > button {
    & > img {
      filter: brightness(0) saturate(100%) invert(100%) sepia(71%)
        saturate(762%) hue-rotate(167deg) brightness(112%) contrast(91%);
      width: 2rem;
    }
  }

  & > button:last-child {
    margin-left: auto;
  }
`;
const StyledButton = styled.button``;

function BookmarksSidebar({ postId, setPostId }) {
  const [update, setUpdate] = useState(false);
  const doUpdate = () => {
    setUpdate(!update);
  };
  const { data, error, loading } = useData({
    path: `posts/${postId}`,
    dependencies: [postId, update],
  });
  const [extendPost, setExtendPost] = useState(false);

  return (
    <StyledSidebar>
      <StyledHeader>
        {extendPost && <Navigate to={`/posts/${postId}`} />}
        <StyledButton onClick={() => setPostId(null)} aria-label="close post">
          <img src={close} alt="" />
        </StyledButton>
        <div>Post</div>
        <StyledButton onClick={() => setExtendPost(true)}>
          <img src={extend} alt="" />
        </StyledButton>
      </StyledHeader>
      {error ? (
        <Error>{error}</Error>
      ) : loading ? (
        <Loading data="post" />
      ) : (
        <PostDetails post={data.post} update={doUpdate} />
      )}
    </StyledSidebar>
  );
}

BookmarksSidebar.propTypes = {
  postId: PropTypes.number.isRequired,
  setPostId: PropTypes.func.isRequired,
};

export default BookmarksSidebar;
