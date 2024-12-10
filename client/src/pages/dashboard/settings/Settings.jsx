import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '@context';
import { fetchAPI } from '@services';
import SettingsForm from './settingsform/SettingsForm';
import * as S from './Settings.styles';

function Settings() {
  const { user, updateInformation, updateUser } = useContext(Context);
  const sections = [
    'Change username/email',
    'Change password',
    'Log out',
    'Logged out',
  ];
  const [activeSection, setActiveSection] = useState(-1);

  const submitUser = async ({ username, email }) => {
    const fetch = await fetchAPI({
      body: {
        username,
        email: user.loginMethod === 'GITHUB' ? undefined : email,
      },
      method: 'PUT',
      path: `users/${user.id}`,
    });
    if (fetch.error) {
      updateInformation({
        error: true,
        message: fetch.result.error
          ? fetch.result.error.msg
          : fetch.result.errors[0].msg,
      });
    } else {
      updateUser();
      setActiveSection(-1);
    }
  };

  const submitPassword = async ({ currentPassword, newPassword }) => {
    const fetch = await fetchAPI({
      body: { currentPassword, password: newPassword },
      method: 'PUT',
      path: `users/${user.id}`,
    });
    if (fetch.error) {
      updateInformation({
        error: true,
        message: fetch.result.error
          ? fetch.result.error.msg
          : fetch.result.errors[0].msg,
      });
    } else {
      setActiveSection(-1);
    }
  };

  const logOut = async () => {
    const fetch = await fetchAPI({
      method: 'GET',
      path: 'auth/logout',
      statusOnly: true,
    });
    if (fetch.error) {
      updateInformation('Error when logging out.');
    } else {
      localStorage.removeItem('id');
      setActiveSection(sections.length - 1);
    }
  };

  return (
    <S.Settings>
      <S.Header>
        <div>Settings</div>
      </S.Header>
      <S.Navbar>
        <ul>
          {sections.map(
            (s, index) =>
              index !== sections.length - 1 && (
                <li key={s}>
                  <button onClick={() => setActiveSection(index)}>{s}</button>
                </li>
              )
          )}
        </ul>
      </S.Navbar>
      {sections[activeSection] === 'Change username/email' ? (
        <SettingsForm type="user" onSubmit={submitUser} />
      ) : sections[activeSection] === 'Change password' ? (
        <SettingsForm type="password" onSubmit={submitPassword} />
      ) : sections[activeSection] === 'Log out' ? (
        <SettingsForm type="logout" onSubmit={logOut} />
      ) : sections[activeSection] === 'Logged out' ? (
        <Navigate to={'/signin'} />
      ) : null}
    </S.Settings>
  );
}

export default Settings;
