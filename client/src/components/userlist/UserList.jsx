import { Link } from 'react-router-dom';
import { Avatar, FollowButton } from '@components';
import PropTypes from 'prop-types';
import * as S from './UserList.styles';

function UserList({ users, details }) {
  return (
    <S.UserList>
      <div>Who to Follow</div>
      <S.Users>
        {users.map((user) => (
          <S.User key={user.id}>
            <Link to={`${user.id}`}>
              <Avatar profile={user.profile} />
              <S.DisplayName>{user.profile.displayName}</S.DisplayName>
              <S.Username>@{user.username}</S.Username>
              {details && <S.Bio>{user.profile.bio}</S.Bio>}
            </Link>
            <FollowButton userId={user.id} />
          </S.User>
        ))}
      </S.Users>
    </S.UserList>
  );
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  details: PropTypes.bool,
};

export default UserList;
