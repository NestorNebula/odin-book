import { useContext } from 'react';
import { Context } from '@context';
import { useInput } from '@hooks';
import { Button, Input } from '@components/forms';
import { validationChains } from '@services';
import PropTypes from 'prop-types';
import * as S from './SettingsForm.styles';

function SettingsForm({ type, onSubmit }) {
  const { user } = useContext(Context);
  const {
    value: username,
    updateValue: updateUsername,
    validation: usernameValidation,
  } = useInput({
    initialValue: user.username,
    validate: validationChains.username,
  });
  const {
    value: email,
    updateValue: updateEmail,
    validation: emailValidation,
  } = useInput({ initialValue: user.email, validate: validationChains.email });
  const {
    value: currentPassword,
    updateValue: updateCurrent,
    validation: currentValidation,
  } = useInput({ validate: validationChains.currentPassword });
  const {
    value: newPassword,
    updateValue: updatePassword,
    validation: passwordValidation,
  } = useInput({ validate: validationChains.password });
  const {
    value: confirmPassword,
    updateValue: updateConfirm,
    validation: confirmValidation,
  } = useInput({ validate: validationChains.confirmPassword });

  const passwordMatch = newPassword === confirmPassword;
  const userValues = [username, email];
  const userValidations = [usernameValidation, emailValidation];
  const passwordValues = [currentPassword, newPassword, confirmPassword];
  const passwordValidations = [
    currentValidation,
    passwordValidation,
    confirmValidation,
  ];
  const userIsValid =
    userValues.every((v) => v) && userValidations.every((v) => v.isValid);
  const passwordIsValid =
    passwordValues.every((v) => v) &&
    passwordValidations.every((v) => v.isValid) &&
    passwordMatch;

  return (
    <S.SettingsForm>
      <S.Header>
        <div>
          {type === 'user'
            ? 'Change your username/email'
            : type === 'password'
            ? 'Change your password'
            : type === 'logout'
            ? 'Log Out'
            : null}
        </div>
      </S.Header>
      {type === 'user' ? (
        <S.Form
          onSubmit={async (e) => {
            e.preventDefault();
            await onSubmit({
              username,
              email: user.loginMethod === 'GITHUB' ? user.email : email,
            });
          }}
        >
          <Input
            name="username"
            value={username}
            updateValue={updateUsername}
            validation={usernameValidation}
            maxLength={15}
          />
          <Input
            name="email"
            value={email}
            updateValue={updateEmail}
            validation={emailValidation}
            type="email"
          />
          {user.loginMethod === 'GITHUB' && (
            <div>
              You are connected with your Github email address. Trying to update
              this email will not be accepted.
            </div>
          )}
          <Button
            type={userIsValid ? 'submit' : 'button'}
            disabled={user.loginMethod === 'GUEST'}
          >
            Save
          </Button>
        </S.Form>
      ) : type === 'password' ? (
        <S.Form
          onSubmit={async (e) => {
            e.preventDefault();
            await onSubmit({ currentPassword, newPassword });
          }}
        >
          <Input
            name="currentPassword"
            value={currentPassword}
            updateValue={updateCurrent}
            validation={currentValidation}
            label="Current Password"
            type="password"
          />
          <Input
            name="newPassword"
            value={newPassword}
            updateValue={updatePassword}
            validation={currentValidation}
            label="New Password"
            type="password"
          />
          <Input
            name="confirmPassword"
            value={confirmPassword}
            updateValue={updateConfirm}
            validation={confirmValidation}
            label="Confirm Password"
            type="password"
          />
          {!passwordMatch && <div>{"Passwords don't match."}</div>}
          <Button
            type={passwordIsValid ? 'submit' : 'button'}
            disabled={user.loginMethod !== 'PASSWORD'}
          >
            Save
          </Button>
        </S.Form>
      ) : type === 'logout' ? (
        <S.Form
          onSubmit={async (e) => {
            e.preventDefault();
            await onSubmit();
          }}
        >
          <Button type="submit">Log Out</Button>
        </S.Form>
      ) : null}
    </S.SettingsForm>
  );
}

SettingsForm.propTypes = {
  type: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SettingsForm;
