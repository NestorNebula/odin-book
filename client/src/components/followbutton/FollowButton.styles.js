import styled from 'styled-components';

const FollowButton = styled.button`
  display: ${(props) => props.$noDisplay && 'none'};
  background-color: ${(props) => props.theme.mainWhite};
  color: ${(props) => props.theme.black};
  border-radius: 2.5rem;
  font-weight: 700;
  width: min(100%, 10rem);
  height: fit-content;
  padding: 0.75rem 0;

  &:hover {
    background-color: ${(props) => props.theme.fourthGray};
  }

  &:disabled {
    background-color: ${(props) => props.theme.thirdGray};
  }
`;
const FollowingButton = styled(FollowButton)`
  background-color: ${(props) => props.theme.black};
  color: ${(props) => props.theme.secondaryWhite};
  border: ${(props) => `1px solid ${props.theme.secondaryGray}`};
`;
const UnfollowButton = styled(FollowButton)`
  background-color: ${(props) => props.theme.black};
  color: ${(props) => props.theme.red};
  border: ${(props) => `1px solid ${props.theme.red}`};

  &:hover {
    background-color: ${(props) => props.theme.black};
  }
`;

export { FollowButton, FollowingButton, UnfollowButton };
