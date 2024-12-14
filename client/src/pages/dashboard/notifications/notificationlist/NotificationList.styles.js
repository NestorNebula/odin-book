import styled from 'styled-components';

const NotificationList = styled.section`
  display: flex;
  flex-direction: column;

  & img {
    width: 2.5rem;
  }
`;
const Notification = {
  Main: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-top: ${(props) => `1px solid ${props.theme.fifthGray}`};
    padding: 1rem 2rem 1rem 3rem;
  `,
  Header: styled.header`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.25rem 0.75rem;

    & > img:first-child {
      grid-row: 1 / 3;
    }

    & > img.FOLLOW,
    & > img.COMMENT {
      filter: brightness(0) saturate(100%) invert(60%) sepia(35%)
        saturate(6205%) hue-rotate(178deg) brightness(96%) contrast(96%);
    }

    & > img.REPOST {
      filter: brightness(0) saturate(100%) invert(51%) sepia(82%)
        saturate(2056%) hue-rotate(124deg) brightness(93%) contrast(100%);
    }

    & > img.LIKE {
      filter: brightness(0) saturate(100%) invert(23%) sepia(80%)
        saturate(4921%) hue-rotate(346deg) brightness(97%) contrast(97%);
    }

    & > div > a {
      font-weight: 700;
    }
  `,
  Profile: styled.div`
    border: ${(props) => `1px solid ${props.theme.fifthGray}`};
    border-radius: 15px;
    margin: 0 3rem;
    padding: 1rem 2rem;
    width: clamp(30vw, 80%, 600px);

    & > a {
      display: grid;
      grid-template-columns: 1fr 10rem;

      & > div:nth-child(3),
      & > div:nth-child(4),
      & > div:nth-child(5) {
        grid-column: 1 / 2;
        max-width: 50ch;
        overflow-x: hidden;
      }

      & > div:nth-child(3) {
        font-weight: 700;
      }

      & > div:nth-child(4) {
        color: ${(props) => props.theme.secondaryGray};
      }
    }
  `,
  Post: styled.div`
    color: ${(props) => props.theme.secondaryGray};
    & > a {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  `,
};

export { NotificationList, Notification };
