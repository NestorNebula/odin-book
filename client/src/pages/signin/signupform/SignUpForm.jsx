import { useInput } from '@hooks';
import { validationChains } from '@services';
import { Input, SubmitButton } from '@components/forms';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSignUpForm = styled.form``;
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
  } = useInput({ validate: validationChains.password });
  const match = password === confirm;
  return (
    <StyledSignUpForm onSubmit={() => onSubmit({ username, email, password })}>
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
      {match && password && confirm && (
        <StyledPwdErrorDiv>{"Passwords don't match."}</StyledPwdErrorDiv>
      )}
      <SubmitButton content="Sign Up" />
    </StyledSignUpForm>
  );
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
