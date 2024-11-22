import { useInput } from '@hooks';
import { validationChains } from '@services';
import { Input, Button, AuthenticationForm } from '@components/forms';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPwdErrorDiv = styled.div``;

function SignUpForm({ onSubmit }) {
  const {
    value: username,
    updateValue: updateUsername,
    validation: usernameValidation,
  } = useInput({ validate: validationChains.username });
  const {
    value: email,
    updateValue: updateEmail,
    validation: emailValidation,
  } = useInput({ validate: validationChains.email });
  const {
    value: password,
    updateValue: updatePassword,
    validation: passwordValidation,
  } = useInput({ validate: validationChains.password });
  const {
    value: confirm,
    updateValue: updateConfirm,
    validation: confirmValidation,
  } = useInput({ validate: validationChains.confirmPassword });
  const match = password === confirm;
  const values = [username, email, password, confirm];
  const validations = [
    usernameValidation,
    emailValidation,
    passwordValidation,
    confirmValidation,
  ];
  const formIsValid =
    values.every((v) => !!v) && validations.every((v) => v.isValid) && match;
  return (
    <AuthenticationForm
      onSubmit={() => onSubmit({ username, email, password })}
    >
      <Input
        name="username"
        value={username}
        updateValue={updateUsername}
        validation={usernameValidation}
      />
      <Input
        name="email"
        value={email}
        updateValue={updateEmail}
        validation={emailValidation}
        type="email"
      />
      <Input
        name="password"
        value={password}
        updateValue={updatePassword}
        validation={passwordValidation}
        type="password"
      />
      <Input
        name="confirm"
        value={confirm}
        updateValue={updateConfirm}
        validation={confirmValidation}
        label="Confirm Password"
        type="password"
      />
      {!match && password && confirm && (
        <StyledPwdErrorDiv>{"Passwords don't match."}</StyledPwdErrorDiv>
      )}
      <Button type={formIsValid ? 'submit' : 'button'}>Sign Up</Button>
    </AuthenticationForm>
  );
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
