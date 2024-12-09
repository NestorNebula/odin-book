import { useContext, useState } from 'react';
import { Context } from '@context';
import { useParams } from 'react-router-dom';
import { useData } from '@hooks';
import { Error, Loading, UserList } from '@components';
import * as S from './Connections.styles';

function Connections() {
  const { user } = useContext(Context);
  const { userId } = useParams();
  const { data, error, loading } = useData({
    path: `users/${userId}`,
    dependencies: [user],
  });

  const sections = ['Followers', 'Following'];
  const [activeSection, setActiveSection] = useState(0);

  return (
    <S.Connections>
      <S.Navbar>
        <ul>
          {sections.map((s, index) => (
            <li key={s}>
              <button onClick={() => setActiveSection(index)}>{s}</button>
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
    </S.Connections>
  );
}

export default Connections;
