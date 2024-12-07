import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useData } from '@hooks';
import { Error, Loading, PostDetails } from '@components';
import { close, extend } from '@assets/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSidebar = styled.aside``;
const StyledHeader = styled.header``;
const StyledButton = styled.button``;

function BookmarksSidebar({ postId, setPostId }) {
  const [update, setUpdate] = useState(false);
  const doUpdate = () => {
    setUpdate(!update);
  };
  const { data, error, loading } = useData({
    path: `posts/${postId}`,
    dependencies: [update],
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
