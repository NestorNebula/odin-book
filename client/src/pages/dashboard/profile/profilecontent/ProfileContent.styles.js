import styled from 'styled-components';

const ProfileContent = styled.section``;
const Navbar = styled.nav`
  border-bottom: ${(props) => `1px solid ${props.theme.fifthGray}`};

  & > ul {
    display: flex;

    & > li {
      width: 100%;
    }
  }
`;
const SectionContent = styled.div``;
const Posts = styled.div``;
const Post = styled.div``;
const Replies = styled.div``;
const Reply = styled.div``;
const Repost = styled.div`
  padding: 1rem 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  filter: brightness(0) saturate(100%) invert(47%) sepia(3%) saturate(575%)
    hue-rotate(162deg) brightness(95%) contrast(92%);

  & > img {
    width: 2rem;
  }
`;
const Medias = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(3, calc(${props.$width / 3}px - 0.25rem))`};
  gap: 0.25rem;
  height: ${(props) => `calc(${props.$width / 3}px - 0.25rem)`};

  & > a {
    height: inherit;
    & > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;
const Likes = styled.div``;
const Like = styled.div``;
const LikeMessage = styled.div`
  background-color: #02113d;
  display: flex;
  align-items: center;
  & img {
    margin: 1rem;
    width: 1.75rem;
    filter: brightness(0) saturate(100%) invert(94%) sepia(8%) saturate(265%)
      hue-rotate(174deg) brightness(106%) contrast(91%);
  }
`;

export {
  ProfileContent,
  Navbar,
  SectionContent,
  Posts,
  Post,
  Replies,
  Reply,
  Repost,
  Medias,
  Likes,
  Like,
  LikeMessage,
};
