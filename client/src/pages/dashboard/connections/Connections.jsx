import { useContext, useState } from 'react';
import { Context } from '@context';
import { useParams } from 'react-router-dom';
import { useData } from '@hooks';
import {
  DefaultSidebar,
  Error,
  Loading,
  NavbarButton,
  UserList,
} from '@components';
import * as S from './Connections.styles';

function Connections() {
  const { user } = useContext(Context);
  const { userId } = useParams();
  const { data, error, loading } = useData({
    path: `users/${userId}`,
    dependencies: [user, userId],
  });

  const sections = ['Followers', 'Following'];
  const [activeSection, setActiveSection] = useState(0);

  return (
    <S.Connections>
      <title>
        {data && data.user
          ? sections[activeSection] === 'Followers'
            ? `People following ${data.user.profile.displayName} (@${data.user.username}) / Odin-Book`
            : sections[activeSection] === 'Following'
            ? `People followed by ${data.user.profile.displayName} (@${data.user.username}) / Odin-Book`
            : `${data.user.profile.displayName} (@${data.user.username}) Connections / Odin-Book`
          : 'Connections / Odin-Book'}
      </title>
      <S.Content>
        {!error && !loading && (
          <S.Header>
            <div>{data.user.profile.displayName}</div>
            <div>@{data.user.username}</div>
          </S.Header>
        )}
        <S.Navbar>
          <ul>
            {sections.map((s, index) => (
              <li key={s}>
                <NavbarButton
                  onClick={() => setActiveSection(index)}
                  selected={index === activeSection}
                >
                  {s}
                </NavbarButton>
              </li>
            ))}
          </ul>
        </S.Navbar>
        {error ? (
          <Error>{error}</Error>
        ) : loading ? (
          <Loading data={sections[activeSection].toLowerCase()} />
        ) : sections[activeSection] === 'Followers' ? (
          data.user.followers.length ? (
            <UserList users={data.user.followers} details={true} />
          ) : (
            <S.Empty>
              <div>Looking for followers?</div>
              <div>
                {
                  "When someone follows this account, they'll show up here. Posting and interacting with other helps boost followers."
                }
              </div>
            </S.Empty>
          )
        ) : sections[activeSection] === 'Following' ? (
          data.user.following.length ? (
            <UserList users={data.user.following} details={true} />
          ) : (
            <S.Empty>
              <div>{`@${data.user.username} isn't following anyone`}</div>
              <div>{"Once they follow accounts, they'll show up here."}</div>
            </S.Empty>
          )
        ) : null}
      </S.Content>
      <DefaultSidebar />
    </S.Connections>
  );
}

export default Connections;
