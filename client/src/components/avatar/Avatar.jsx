import PropTypes from 'prop-types';
import { avatar } from '@assets/icons';
import styled from 'styled-components';

const StyledAvatar = styled.img`
  height: ${(props) => props.$width ?? '5rem'};
  width: ${(props) => props.$width ?? '5rem'};
  border-radius: ${(props) => props.$width ?? '5rem'};
  object-fit: cover;
`;

function Avatar({ profile, ...props }) {
  return (
    <StyledAvatar src={profile.avatar ?? avatar} alt="" $width={props.width} />
  );
}

Avatar.propTypes = {
  profile: PropTypes.object.isRequired,
  width: PropTypes.string,
};

export default Avatar;
