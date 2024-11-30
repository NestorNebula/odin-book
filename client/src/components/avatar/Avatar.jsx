import PropTypes from 'prop-types';
import { avatar } from '@assets/icons';
import styled from 'styled-components';

const StyledAvatar = styled.img``;

function Avatar({ profile }) {
  return <StyledAvatar src={profile.avatar ?? avatar} />;
}

Avatar.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Avatar;
