import PropTypes from 'prop-types';
import { avatar } from '@assets/icons';
import styled from 'styled-components';

const StyledAvatar = styled.img`
  width: ${(props) => props.$width ?? '5rem'};
  border-radius: ${(props) => props.$width ?? '5rem'};
`;

function Avatar({ profile }) {
  return <StyledAvatar src={profile.avatar ?? avatar} alt="" />;
}

Avatar.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Avatar;
