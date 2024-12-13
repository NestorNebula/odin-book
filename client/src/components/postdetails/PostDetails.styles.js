import styled from 'styled-components';

const PostDetails = styled.div`
  & > form {
    border-bottom: ${(props) => `1px solid ${props.theme.fifthGray}`};
    width: 100%;
    padding-bottom: 1rem;
  }
`;
const ParentPosts = styled.div``;
const ParentPost = styled.div``;
const Comments = styled.div``;
const Comment = styled.div``;

export { PostDetails, ParentPosts, ParentPost, Comments, Comment };
